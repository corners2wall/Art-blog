// @ts-nocheck
import { EventDispatcher, Quaternion, Spherical, Vector2, Vector3 } from 'three';

export default class CustomOrbitControl extends EventDispatcher {
  constructor(object, domElement) {
    super();

    this.handleMouseMoveRotate = handleMouseMoveRotate;
    this.object = object;
    this.domElement = domElement;
    this.domElement.style.touchAction = 'none'; // disable touch scroll

    // Set to false to disable this control
    this.enabled = true;

    // "target" sets the location of focus, where the object orbits around
    this.target = new Vector3();

    // Sets the 3D cursor (similar to Blender), from which the maxTargetRadius takes effect
    this.cursor = new Vector3();

    // How far you can dolly in and out ( PerspectiveCamera only )
    this.minDistance = 0;
    this.maxDistance = Infinity;

    // How far you can zoom in and out ( OrthographicCamera only )
    this.minZoom = 0;
    this.maxZoom = Infinity;

    // Limit camera target within a spherical area around the cursor
    this.minTargetRadius = 0;
    this.maxTargetRadius = Infinity;

    // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    this.minPolarAngle = 0; // radians
    this.maxPolarAngle = Math.PI; // radians

    // How far you can orbit horizontally, upper and lower limits.
    // If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
    this.minAzimuthAngle = -Infinity; // radians
    this.maxAzimuthAngle = Infinity; // radians

    // Set to true to enable damping (inertia)
    // If damping is enabled, you must call controls.update() in your animation loop
    this.enableDamping = false;
    this.dampingFactor = 0.05;

    this.rotateSpeed = 3.5;

    this.zoomToCursor = false;

    // this method is exposed, but perhaps it would be better if we can make it private...
    this.update = (function () {
      const offset = new Vector3();

      // so camera.up is the orbit axis
      const quat = new Quaternion().setFromUnitVectors(object.up, new Vector3(0, 1, 0));
      const quatInverse = quat.clone().invert();

      const lastPosition = new Vector3();
      const lastQuaternion = new Quaternion();
      const lastTargetPosition = new Vector3();

      const twoPI = 2 * Math.PI;

      return function update() {
        const position = scope.object.position;

        offset.copy(position).sub(scope.target);

        // rotate offset to "y-axis-is-up" space
        offset.applyQuaternion(quat);

        // angle from z-axis around y-axis
        spherical.setFromVector3(offset);

        // MyChange: always true
        if (scope.enableDamping) {
          spherical.theta += sphericalDelta.theta * scope.dampingFactor;
          spherical.phi += sphericalDelta.phi * scope.dampingFactor;
        }

        // restrict theta to be between desired limits

        let min = scope.minAzimuthAngle;
        let max = scope.maxAzimuthAngle;

        if (isFinite(min) && isFinite(max)) {
          if (min < -Math.PI) min += twoPI;
          else if (min > Math.PI) min -= twoPI;

          if (max < -Math.PI) max += twoPI;
          else if (max > Math.PI) max -= twoPI;

          if (min <= max) {
            spherical.theta = Math.max(min, Math.min(max, spherical.theta));
          } else {
            spherical.theta =
              spherical.theta > (min + max) / 2
                ? Math.max(min, spherical.theta)
                : Math.min(max, spherical.theta);
          }
        }

        // restrict phi to be between desired limits
        spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));

        spherical.makeSafe();

        // Limit the target distance from the cursor to create a sphere around the center of interest
        scope.target.sub(scope.cursor);
        scope.target.clampLength(scope.minTargetRadius, scope.maxTargetRadius);
        scope.target.add(scope.cursor);

        // adjust the camera position based on zoom only if we're not zooming to the cursor or if it's an ortho camera
        // we adjust zoom later in these cases
        if ((scope.zoomToCursor && performCursorZoom) || scope.object.isOrthographicCamera) {
          spherical.radius = clampDistance(spherical.radius);
        }

        offset.setFromSpherical(spherical);

        // rotate offset back to "camera-up-vector-is-up" space
        offset.applyQuaternion(quatInverse);

        position.copy(scope.target).add(offset);

        scope.object.lookAt(scope.target);

        if (scope.enableDamping === true) {
          sphericalDelta.theta *= 1 - scope.dampingFactor;
          sphericalDelta.phi *= 1 - scope.dampingFactor;
        }

        if (
          lastPosition.distanceToSquared(scope.object.position) > EPS ||
          8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS ||
          lastTargetPosition.distanceToSquared(scope.target) > 0
        ) {
          lastPosition.copy(scope.object.position);
          lastQuaternion.copy(scope.object.quaternion);
          lastTargetPosition.copy(scope.target);

          return true;
        }

        return false;
      };
    })();

    //
    // internals
    //

    const scope = this;

    const EPS = 0.000001;

    // current position in spherical coordinates
    const spherical = new Spherical();
    const sphericalDelta = new Spherical();

    const rotateStart = new Vector2();
    const rotateEnd = new Vector2();
    const rotateDelta = new Vector2();

    let performCursorZoom = false;

    function rotateLeft(angle) {
      sphericalDelta.theta -= angle;
    }

    function rotateUp(angle) {
      sphericalDelta.phi -= angle;
    }

    function clampDistance(dist) {
      return Math.max(scope.minDistance, Math.min(scope.maxDistance, dist));
    }

    function handleMouseMoveRotate(event) {
      rotateEnd.set(event.clientX, event.clientY);

      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);

      const element = scope.domElement;

      rotateLeft((2 * Math.PI * rotateDelta.x) / element.clientHeight);

      rotateUp((2 * Math.PI * rotateDelta.y) / element.clientHeight);

      rotateStart.copy(rotateEnd);

      scope.update();
    }

    this.update();
  }
}
