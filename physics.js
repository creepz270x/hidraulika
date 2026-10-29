/* SI internally: cm² → m², cm → m, kPa → Pa. */
(function(root) {
  const physics = {
    pascal(force, a1, a2, stroke) {
      const pressure = force / (a1 * 1e-4);
      return { pressure, force2: pressure * a2 * 1e-4, ratio: a2 / a1, stroke2: stroke * a1 / a2, work: force * stroke / 100 };
    },
    hydro(rho, depth, surface = 0) { return surface + rho * 9.81 * depth; },
    absolute(gauge, atmosphere) { return gauge + atmosphere; },
    compression(pressureKpa) { return { liquid: 1 - pressureKpa / 1725000, gas: 101.325 / (101.325 + pressureKpa) }; },
    flow(head1, head2) { return Math.sign(head1-head2) * Math.sqrt(2 * 9.81 * Math.abs(head1-head2)); }
  };
  root.Physics = physics;
  if (typeof module !== 'undefined') module.exports = physics;
})(typeof window !== 'undefined' ? window : globalThis);
