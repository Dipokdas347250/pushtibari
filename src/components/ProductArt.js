// Illustrated product packs (jar, pouch, box) drawn in SVG, coloured per product.
// Swap for real photos later by rendering <Image> where this component is used.
import { site } from "@/data/site";
export default function ProductArt({ art, className = "", style }) {
  const { shape, lid, fill, label, text, sub } = art;
  const fontSize = text.length > 7 ? 13 : 16;

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} role="img" aria-label={`${text} ${sub} pack`}>
      <ellipse cx="100" cy="182" rx="58" ry="7" fill="#2f2440" opacity="0.1" />

      {shape === "jar" && (
        <g>
          <rect x="54" y="62" width="92" height="116" rx="24" fill="#fff" stroke="#2f2440" strokeOpacity=".08" strokeWidth="2" />
          <rect x="58" y="104" width="84" height="70" rx="20" fill={fill} />
          <rect x="62" y="32" width="76" height="26" rx="8" fill={lid} />
          <rect x="62" y="32" width="76" height="8" rx="4" fill="#fff" opacity=".25" />
          <rect x="68" y="56" width="64" height="9" rx="3" fill={lid} opacity=".75" />
          <rect x="62" y="96" width="76" height="52" rx="12" fill={label} />
          <rect x="62" y="96" width="76" height="52" rx="12" fill="none" stroke={lid} strokeWidth="2" strokeDasharray="3 4" />
          <rect x="63" y="72" width="7" height="88" rx="3.5" fill="#fff" opacity=".7" />
          <Label text={text} sub={sub} color={lid} y={118} fontSize={fontSize} />
        </g>
      )}

      {shape === "pouch" && (
        <g>
          <path d="M56 40h88l10 128a10 10 0 0 1-10 11H56a10 10 0 0 1-10-11L56 40Z" fill={fill} />
          <path d="M56 40h88l2 22H54l2-22Z" fill={lid} />
          <rect x="60" y="47" width="80" height="3" rx="1.5" fill="#fff" opacity=".5" />
          <circle cx="100" cy="30" r="0" />
          <path d="M84 40c0-8 7-12 16-12s16 4 16 12" fill="none" stroke={lid} strokeWidth="5" strokeLinecap="round" />
          <rect x="62" y="86" width="76" height="62" rx="14" fill={label} />
          <circle cx="100" cy="164" r="5" fill="#fff" opacity=".7" />
          <path d="M60 70c4 30 2 70-2 100" stroke="#fff" strokeOpacity=".45" strokeWidth="5" strokeLinecap="round" fill="none" />
          <Label text={text} sub={sub} color={lid} y={112} fontSize={fontSize} />
        </g>
      )}

      {shape === "box" && (
        <g>
          <path d="M142 50l12-8v128l-12 8V50Z" fill={lid} opacity=".55" />
          <path d="M58 50l12-8h84l-12 8H58Z" fill={lid} opacity=".8" />
          <rect x="54" y="50" width="88" height="128" rx="8" fill={fill} />
          <rect x="54" y="50" width="88" height="22" rx="8" fill={lid} />
          <rect x="54" y="64" width="88" height="8" fill={lid} />
          <rect x="60" y="88" width="76" height="56" rx="12" fill={label} />
          <Label text={text} sub={sub} color={lid} y={112} fontSize={Math.min(fontSize, 13)} />
          <circle cx="98" cy="160" r="8" fill={label} opacity=".85" />
          <path d="m94 160 3 3 5-6" stroke={lid} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      <g fill="#fff" opacity=".9">
        <circle cx="160" cy="44" r="4" />
        <circle cx="38" cy="88" r="3" />
        <path d="M168 120c.6 4 2.6 6 6.6 6.6-4 .6-6 2.6-6.6 6.6-.6-4-2.6-6-6.6-6.6 4-.6 6-2.6 6.6-6.6Z" />
      </g>
    </svg>
  );
}

function Label({ text, sub, color, y, fontSize }) {
  return (
    <g fontFamily="var(--font-fredoka), sans-serif" textAnchor="middle">
      <text x="100" y={y - 8} fontSize="7" fill={color} letterSpacing="2" fontWeight="600">
        {site.name.toUpperCase()}
      </text>
      <text x="100" y={y + 8} fontSize={fontSize} fill="#2f2440" fontWeight="700">
        {text}
      </text>
      <text x="100" y={y + 21} fontSize="7.5" fill={color} letterSpacing="1.5" fontWeight="600">
        {sub}
      </text>
    </g>
  );
}
