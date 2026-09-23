/**
 * Three soft light sources drifting behind a section. Pure CSS, no client JS,
 * and the drift stops under reduced motion. The parent must be
 * position: relative and overflow: hidden, and its content must sit above z-0.
 *
 * `tone` picks the palette: the light hero uses the layer tints at low
 * strength, the dark bands push them harder so they read against near black.
 */
export default function Aurora({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div aria-hidden="true" className={`aurora aurora-${tone}`}>
      <span className="orb orb-a" />
      <span className="orb orb-b" />
      <span className="orb orb-c" />
    </div>
  );
}
