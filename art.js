/* MoonHongKIPPER — 카드 그림 (이 사이트를 위해 직접 그린 선화, 100×100 상자 기준)
 * 기본은 선(stroke). class="g" 금색 선, class="f" 금색 채움, class="p" 종이색 채움.
 */
(() => {
  const SP = (x, y, r) => `<path class="f" d="M${x} ${y - r}l${r * .28} ${r * .72} ${r * .72} ${r * .28}-${r * .72} ${r * .28}-${r * .28} ${r * .72}-${r * .28}-${r * .72}-${r * .72}-${r * .28} ${r * .72}-${r * .28}z"/>`;
  const STAR = (cx, cy, R) => {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5;
      const r = i % 2 ? R * .42 : R;
      pts.push(`${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
    }
    return `M${pts.join('L')}Z`;
  };
  const eyes = (y, l, r) => `<circle class="f" cx="${l}" cy="${y}" r="1.8"/><circle class="f" cx="${r}" cy="${y}" r="1.8"/>`;

  window.ART = {
    1: '<circle cx="50" cy="36" r="15"/><path d="M35 33C35 17 65 17 65 33C58 27 46 25 35 33Z"/>' + eyes(38, 44, 56) +
       '<path class="g" d="M45 44Q50 48 55 44"/><path d="M45 50V58M55 50V58M24 92C24 72 36 60 50 60C64 60 76 72 76 92"/><path d="M42 61L50 70L58 61"/>' +
       '<path class="g" d="M50 70L46 84L50 90L54 84Z"/>' + SP(82, 20, 6),
    2: '<circle cx="50" cy="38" r="14"/><path d="M36 38C33 14 67 14 64 38C66 52 70 58 74 64M36 38C34 52 30 58 26 64"/><path d="M37 32Q48 24 63 32"/>' + eyes(40, 44, 56) +
       '<path class="g" d="M45 46Q50 50 55 46"/><path class="g" d="M66 18L58 12V24ZM66 18L74 12V24Z"/>' +
       '<path d="M26 92C26 76 38 64 50 64C62 64 74 76 74 92"/><path class="g" d="M42 70Q50 77 58 70"/>' + SP(18, 22, 6),
    3: '<circle cx="39" cy="58" r="19"/><circle cx="61" cy="58" r="19"/><path class="f" d="M61 30l7 8-7 7-7-7z"/><path class="g" d="M61 39V30"/>' +
       SP(20, 24, 6) + SP(84, 86, 5),
    4: '<circle cx="28" cy="34" r="9"/><path d="M15 90V62Q15 46 28 46Q41 46 41 62V90"/><circle cx="72" cy="34" r="9"/><path d="M59 90V62Q59 46 72 46Q85 46 85 62V90"/>' +
       '<path class="g" d="M41 64L50 60L59 64"/><path class="f" d="M50 36C42 30 42 22 47 22C49 22 50 24 50 25C50 24 51 22 53 22C58 22 58 30 50 36Z"/>',
    5: '<path d="M30 30H62M36 30V14H56V30"/><path class="g" d="M36 25H56"/><circle cx="46" cy="42" r="12"/>' + eyes(40, 41, 51) +
       '<path class="g" d="M38 48Q42 44 46 47Q50 44 54 48"/><path d="M22 92C22 72 32 60 46 60C60 60 68 72 68 92"/><path d="M40 61L46 68L52 61"/>' +
       '<path class="g" d="M78 52V92M78 52Q78 44 86 46"/>',
    6: '<circle cx="50" cy="24" r="7"/><circle cx="50" cy="42" r="13"/><path d="M37 41Q38 30 50 30Q62 30 63 41"/>' + eyes(44, 45, 55) +
       '<path class="g" d="M46 50Q50 53 54 50"/><path d="M24 92C24 72 36 60 50 60C64 60 76 72 76 92"/><path d="M30 74Q50 88 70 74"/><circle class="f" cx="50" cy="70" r="3.200"/>' +
       SP(82, 24, 6),
    7: '<rect x="16" y="32" width="68" height="46" rx="3"/><path d="M16 34L50 58L84 34"/><path d="M16 78L40 56M84 78L60 56"/>' +
       `<path class="f" d="${STAR(50, 60, 9)}"/><path class="g" d="M50 12V22M36 16l4 7M64 16l-4 7"/>`,
    8: '<path d="M18 38C18 26 82 26 82 38C82 60 66 70 50 64C34 70 18 60 18 38Z"/><ellipse cx="36" cy="42" rx="8" ry="5"/><ellipse cx="64" cy="42" rx="8" ry="5"/>' +
       '<path d="M38 56Q50 60 62 52"/><path class="g" d="M18 40L8 36M82 40L92 36M66 64L80 92"/>',
    9: '<path d="M24 46A27 27 0 0 1 74 36"/><path d="M64 36H75V25"/><path d="M76 54A27 27 0 0 1 26 64"/><path d="M36 64H25V75"/>' +
       '<circle class="f" cx="50" cy="50" r="3"/>' + SP(84, 14, 5) + SP(16, 88, 5),
    10: '<rect x="20" y="38" width="60" height="44" rx="6"/><path d="M40 38V28H60V38M34 38V82M66 38V82"/><circle cx="30" cy="88" r="4"/><circle cx="70" cy="88" r="4"/>' +
        '<rect class="g" x="43" y="52" width="14" height="9" rx="1"/><path class="g" d="M12 20Q24 12 36 20"/>' + SP(82, 18, 6),
    11: '<ellipse cx="38" cy="54" rx="20" ry="6"/><path d="M18 54V82C18 90 58 90 58 82V54"/><path d="M18 64C18 70 58 70 58 64M18 73C18 79 58 79 58 73"/>' +
        '<circle class="g" cx="72" cy="34" r="14"/><circle class="g" cx="72" cy="34" r="8"/>' + SP(84, 70, 6) + SP(22, 26, 5),
    12: '<circle cx="50" cy="46" r="13"/><path d="M37 46C35 28 65 28 63 46C65 56 64 62 68 68M37 46C35 56 36 62 32 68"/>' +
        '<path class="f" d="M40 32L42 22L46 28L50 17L54 28L58 22L60 32Z"/>' + eyes(48, 45, 55) + '<path class="g" d="M46 54Q50 57 54 54"/>' +
        '<path d="M26 94C26 80 38 70 50 70C62 70 74 80 74 94"/><path class="g" d="M40 74Q50 82 60 74"/><circle class="f" cx="50" cy="79" r="2.400"/>',
    13: '<path d="M32 30H68M39 30V12H61V30"/><path class="g" d="M39 25H61"/><circle cx="50" cy="42" r="12"/>' + eyes(42, 45, 55) +
        '<path class="g" d="M45 48Q50 52 55 48"/><path d="M24 94C24 74 36 62 50 62C64 62 76 74 76 94"/>' +
        '<path class="f" d="M43 64L50 68L43 72ZM57 64L50 68L57 72Z"/><circle class="g" cx="64" cy="82" r="4"/>',
    14: '<rect x="16" y="34" width="68" height="46" rx="3"/><path d="M16 36L50 60L84 36"/><path d="M16 80L40 58M84 80L60 58"/>' +
        '<path class="f" d="M50 50C46 56 44 59 44 63A6 6 0 0 0 56 63C56 59 54 56 50 50Z"/><path class="g" d="M30 12l-4 10M48 10l-4 10M66 12l-4 10M84 16l-4 10"/>',
    15: '<path d="M50 84C20 62 12 42 24 28C34 17 48 23 50 34C52 23 66 17 76 28C88 42 80 62 50 84Z"/>' +
        '<path class="g" d="M14 76L86 26M86 26L75 27M86 26L83 36M14 76L12 68M14 76L22 78"/><path class="f" d="M80 64C75 60 75 55 78 55C79.500 55 80 56.500 80 57C80 56.500 80.500 55 82 55C85 55 85 60 80 64Z"/>',
    16: '<path d="M44 90V74C34 70 26 60 26 46C26 30 38 20 52 20C66 20 74 30 72 42L78 50L72 54C74 64 68 70 60 70V90"/>' +
        '<path class="g" d="M50 46a4 4 0 1 1 4 4a9 9 0 1 1-9-9"/><circle class="g" cx="80" cy="30" r="3"/><circle class="g" cx="88" cy="16" r="5"/>',
    17: '<rect x="22" y="48" width="56" height="38"/><rect x="18" y="38" width="64" height="11"/><path class="g" d="M50 38V86"/>' +
        '<path class="g" d="M50 38C40 22 26 28 38 38M50 38C60 22 74 28 62 38"/>' + SP(84, 20, 6) + SP(14, 22, 5),
    18: '<circle cx="50" cy="52" r="24"/><path class="g" d="M50 28C45 20 56 16 55 24"/>' + eyes(50, 41, 59) +
        '<path d="M44 60Q50 66 56 60"/><circle class="g" cx="35" cy="58" r="3"/><circle class="g" cx="65" cy="58" r="3"/><path d="M36 82Q50 94 64 82"/>',
    19: '<rect x="40" y="44" width="20" height="40" rx="2"/><path d="M26 86H74M32 86L36 92H64L68 86"/><path d="M50 44V38"/>' +
        '<path class="g" d="M50 33C44 27 56 21 50 14C47 10 50 6 52 4"/><path class="g" d="M24 30q6 6 0 12M76 30q-6 6 0 12"/>',
    20: '<path d="M16 50L50 20L84 50"/><path d="M26 42V86H74V42"/><path d="M43 86V66Q50 58 57 66V86"/><path d="M66 32V20H72V38"/>' +
        '<rect class="g" x="31" y="52" width="10" height="10"/><rect class="g" x="59" y="52" width="10" height="10"/><path class="g" d="M69 14q-4-4 0-8"/>',
    21: '<path d="M28 52V40Q28 30 38 30H62Q72 30 72 40V52"/><path d="M20 58Q20 50 26 50Q32 50 32 58V72H68V58Q68 50 74 50Q80 50 80 58V80H20Z"/>' +
        '<path d="M24 80V88M76 80V88"/><path class="g" d="M32 72V62H68V72"/><rect class="g" x="40" y="8" width="20" height="14"/>' + SP(88, 20, 5),
    22: '<path d="M28 58C28 34 72 34 72 58Z"/><path d="M22 58H78"/><path class="g" d="M50 36C50 22 62 14 72 16C62 18 58 26 56 36"/>' +
        '<path d="M32 58Q32 78 50 80Q68 78 68 58"/>' + eyes(68, 42, 58) + '<path d="M44 74H56"/><path class="f" d="' + STAR(50, 90, 5) + '"/>',
    23: '<path d="M16 36L50 14L84 36Z"/><path d="M18 40H82M26 44V80M42 44V80M58 44V80M74 44V80M18 80H82M12 86H88"/><circle class="f" cx="50" cy="29" r="3"/>',
    24: '<path d="M28 40Q30 18 50 18Q70 18 72 40Z"/><path class="g" d="M34 30H66"/><circle cx="50" cy="52" r="20"/>' +
        '<path class="f" d="M26 44Q50 38 74 44V56Q50 52 26 56Z"/><circle class="p" cx="41" cy="49" r="3"/><circle class="p" cx="59" cy="49" r="3"/>' +
        '<path d="M44 64Q50 61 56 64"/><path class="g" d="M70 74Q84 68 90 80Q92 92 78 92Q64 92 66 82Z"/><path class="g" d="M70 74l4 4"/>',
    25: `<path class="g" d="M36 10L44 42M64 10L56 42M36 10H48M52 10H64"/><circle cx="50" cy="62" r="20"/><circle class="g" cx="50" cy="62" r="15"/><path class="f" d="${STAR(50, 62, 10)}"/>`,
    26: '<path d="M28 24V56A22 22 0 0 0 72 56V24"/><path d="M40 24V56A10 10 0 0 0 60 56V24"/><path d="M28 24H40M60 24H72"/>' +
        '<circle class="f" cx="34" cy="38" r="1.800"/><circle class="f" cx="34" cy="52" r="1.800"/><circle class="f" cx="66" cy="38" r="1.800"/><circle class="f" cx="66" cy="52" r="1.800"/>' +
        SP(16, 82, 7) + SP(84, 84, 6) + SP(50, 10, 5),
    27: '<path d="M14 72H38Q44 72 46 76H60Q66 76 66 80Q66 84 60 84H44"/><path d="M64 80L80 68Q86 64 88 70L68 90H14"/>' +
        '<circle class="g" cx="54" cy="36" r="11"/><path class="g" d="M54 30V42"/><path class="g" d="M40 18l-4-6M54 14V6M68 18l4-6"/>' + SP(82, 34, 5),
    28: '<path d="M28 12H72M28 88H72"/><path d="M33 12C33 36 47 42 47 50C47 58 33 64 33 88M67 12C67 36 53 42 53 50C53 58 67 64 67 88"/>' +
        '<path class="f" d="M40 28H60C58 36 52 42 50 44C48 42 42 36 40 28Z"/><path class="f" d="M38 86C40 76 46 72 50 72C54 72 60 76 62 86Z"/><path class="g" d="M50 50V70"/>',
    29: '<rect x="22" y="20" width="56" height="58" rx="3"/><path d="M36 20V78M50 20V78M64 20V78M22 49H78"/>' +
        '<circle class="g" cx="80" cy="88" r="6"/><path class="g" d="M58 92Q66 86 74 88"/>',
    30: '<circle cx="50" cy="38" r="12"/><path d="M37 37Q35 22 50 22Q65 22 63 37"/><path d="M37 37C30 41 37 47 32 53M63 37C70 41 63 47 68 53"/>' +
        eyes(40, 45, 55) + '<path d="M24 92L32 60Q50 52 68 60L76 92Z"/><path class="g" d="M44 58L50 68L56 58"/><path class="g" d="M38 76H62M38 82H62"/>',
    31: '<rect x="40" y="14" width="20" height="10" rx="2"/><path d="M38 24H62V32Q72 36 72 46V82Q72 88 66 88H34Q28 88 28 82V46Q28 36 38 32Z"/>' +
        '<path class="g" d="M50 48V74M37 61H63"/>' + SP(84, 20, 5),
    32: '<path d="M26 56A13 13 0 0 1 28 30A17 17 0 0 1 60 24A14 14 0 0 1 74 56Z"/><path class="f" d="M54 58L42 78H52L46 94L66 70H56L62 58Z"/>' +
        '<path class="g" d="M30 64l-4 10M38 68l-4 10M74 64l-4 10M82 60l-4 10"/>',
    33: '<path class="g" d="M30 32C24 22 38 14 44 20C48 10 66 12 66 22C76 22 78 36 66 36H34C28 36 26 34 30 32Z"/><path class="g" d="M38 28q4-4 8 0t8 0 8 0"/>' +
        '<circle cx="50" cy="62" r="14"/><path d="M42 60Q44 62 46 60M54 60Q56 62 58 60M44 70Q50 66 56 70"/><path d="M28 94Q28 80 50 80Q72 80 72 94"/>' +
        '<path class="g" d="M40 42v4M50 42v6M60 42v4"/>',
    34: '<circle cx="38" cy="58" r="14"/><circle class="g" cx="38" cy="58" r="5"/>' +
        '<path d="M38 38V44M38 72V78M18 58H24M52 58H58M24 44L28 48M52 72L48 68M52 44L48 48M24 72L28 68"/>' +
        '<path d="M68 20L90 30L86 40L64 30Z"/><path class="g" d="M76 35L64 88"/>',
    35: '<path d="M6 48H94"/><path d="M8 48L24 30L34 40L46 26L62 48"/><circle class="g" cx="78" cy="28" r="7"/>' +
        '<path d="M28 94Q46 72 44 62Q42 54 49 48M72 94Q58 72 60 62Q62 54 53 48"/><path class="g" d="M51 88V82M50 72V68M50 60V57"/>',
    36: '<path d="M30 58H70L62 68H38Z"/><path d="M50 58V22"/><path d="M53 24L72 54H53Z"/>' +
        '<path d="M6 74Q16 66 26 74T46 74T66 74T86 74"/><path class="g" d="M14 86Q24 78 34 86T54 86T74 86T94 86"/>' +
        SP(24, 22, 9) + SP(84, 30, 5)
  };
})();
