(() => {
  'use strict';

  const CARDS = window.CARDS;
  const ART = window.ART;
  const byN = (n) => CARDS[n - 1];

  /* 그랑 타블로의 36개 자리(하우스). n번 자리는 n번 카드의 집이다. [주제, 설명] */
  const HOUSES = [null,
    ['남자', '남성 질문자 본인, 또는 삶에 영향을 주는 남자의 자리입니다.'],
    ['여자', '여성 질문자 본인, 또는 삶에 영향을 주는 여자의 자리입니다.'],
    ['약속·결합', '결혼과 계약, 공식적으로 묶이는 관계입니다.'],
    ['만남·모임', '사람을 만나는 자리, 대화와 교류입니다.'],
    ['도와주는 어른', '조언과 보호, 나를 이끌어 주는 남자 어른입니다.'],
    ['돌봐 주는 어른', '보살핌과 지혜, 나를 챙기는 여자 어른입니다.'],
    ['반가운 소식', '기다리던 연락, 글로 오는 좋은 일입니다.'],
    ['경계할 사람', '겉과 속이 다른 것, 조심해야 할 관계입니다.'],
    ['변화', '바뀌어 가는 것, 옮겨 가는 것입니다.'],
    ['이동·여행', '몸이 움직이는 일, 떠나고 돌아오는 것입니다.'],
    ['재물', '돈과 자원, 넉넉함이 모이는 곳입니다.'],
    ['젊은 여성·친구', '또래의 여자, 친구와 딸, 생기 있는 기운입니다.'],
    ['젊은 남성·친구', '또래의 남자, 친구와 아들, 당당한 기운입니다.'],
    ['실망', '기대와 다른 소식, 마음을 가라앉히는 일입니다.'],
    ['사랑', '마음이 향하는 곳, 애정과 기쁨입니다.'],
    ['생각·속마음', '머릿속 계획과 남에게 보이지 않는 마음입니다.'],
    ['선물·기회', '대가 없이 받는 것, 주어지는 기회입니다.'],
    ['새 시작·아이', '이제 막 시작한 작은 일, 아이와 순수함입니다.'],
    ['끝맺음', '끝나 가는 것, 떠나보내야 할 것입니다.'],
    ['가정·기반', '집과 가족, 삶의 바탕이 되는 곳입니다.'],
    ['사생활', '가까운 사람들만 아는 속사정입니다.'],
    ['규율·권위', '규칙과 의무, 나를 다스리거나 지켜 주는 힘입니다.'],
    ['판단·심사', '평가받는 일, 공정함이 시험받는 곳입니다.'],
    ['손실', '새어 나가는 것, 빼앗기는 것입니다.'],
    ['명예·인정', '이름이 높아지는 일, 남들의 인정입니다.'],
    ['큰 행운', '가장 밝게 빛나는 곳, 기쁨과 성공입니다.'],
    ['뜻밖의 이익', '갑자기 찾아오는 돈과 기회입니다.'],
    ['기다림', '아직 오지 않은 일, 품고 있는 기대입니다.'],
    ['묶임·제약', '벗어나기 어려운 틀, 고립된 부분입니다.'],
    ['전문가·절차', '공식 서류와 절차, 도와줄 전문가입니다.'],
    ['쉬어 갈 곳', '잠깐 멈추는 일, 몸과 마음의 신호입니다.'],
    ['근심', '무겁게 짓누르는 일, 넘어야 할 고비입니다.'],
    ['걱정', '어두운 생각, 마음속 불안입니다.'],
    ['일·노력', '직업과 해야 할 일, 들이는 노력입니다.'],
    ['먼 곳·긴 시간', '멀리 있는 것, 오래 걸리는 일입니다.'],
    ['희망', '바라보는 꿈, 바다 건너 먼 가능성입니다.']
  ];

  /* 그랑 타블로: 9장씩 네 줄 (NaviKipper와 같은 배치) */
  const gtGrid = [0, 1, 2, 3].map((r) => Array.from({ length: 9 }, (_, c) => r * 9 + c + 1));
  const GT_RC = {};
  const GT_AT = {};
  gtGrid.forEach((row, r) => row.forEach((p, c) => { if (p) { GT_RC[p] = [r, c]; GT_AT[`${r},${c}`] = p; } }));
  const gtPositions = {};
  for (let n = 1; n <= 36; n++) gtPositions[n] = [`${byN(n).ko}의 집`, HOUSES[n][1]];

  /* 스프레드. grid: 자리 번호를 놓은 모양(0은 빈칸). 뽑는 순서 = 자리 번호 순서.
   * positions: 자리 번호 → [이름, 설명]. combos: [[자리들], 묶어 읽는 뜻] */
  const SPREADS = {
    one: {
      name: '1카드', sub: '오늘의 한 장', count: 1, grid: [[1]],
      intro: '오늘의 메시지, 빠른 답, YES or NO가 궁금할 때.',
      how: '질문을 짧고 분명하게 정하고 한 장을 뽑습니다. 그림이 말하는 장면을 질문에 그대로 대어 봅니다. YES or NO 질문이라면 카드의 긍정·부정으로 답을 가늠합니다.',
      positions: { 1: ['답 · 메시지', '질문에 대한 답이자 오늘 알아 둘 핵심입니다. 긍정 카드면 YES, 부정 카드면 NO 쪽으로 읽습니다.'] },
      combos: []
    },
    three: {
      name: '3카드', sub: '과거 · 현재 · 미래', count: 3, grid: [[1, 2, 3]],
      intro: '가장 많이 쓰는 기본 배열. 가운데 카드를 중심으로 흐름을 읽습니다.',
      how: '키퍼는 그림이 곧 장면입니다. 세 장을 왼쪽부터 이야기처럼 이어, “이런 일이 있어서 → 지금 이렇고 → 이렇게 된다”로 읽습니다.',
      positions: {
        1: ['과거 · 원인', '지금 상황이 만들어진 배경입니다.'],
        2: ['현재 · 중심', '질문의 한가운데입니다. 양옆 카드가 이 카드를 꾸며 줍니다.'],
        3: ['미래 · 결과', '이대로 흘러갈 때 닿게 될 곳입니다.']
      },
      combos: [[[1, 2], '지금 상황이 만들어진 흐름'], [[2, 3], '앞으로 이어질 흐름']]
    },
    five: {
      name: '5카드', sub: '한 줄 이야기', count: 5, grid: [[1, 2, 3, 4, 5]],
      intro: '원인에서 결과까지 다섯 장을 한 줄 이야기로 읽습니다.',
      how: '3번이 중심입니다. 왼쪽 두 장이 원인, 오른쪽 두 장이 결과입니다. 양 끝 카드를 짝지어 읽으면 전체 이야기의 요약이 됩니다.',
      positions: {
        1: ['먼 원인', '이야기의 출발점, 일이 시작된 뿌리입니다.'],
        2: ['가까운 원인', '중심 카드 바로 앞에서 상황을 만든 일입니다.'],
        3: ['중심', '문제의 한가운데이자 지금 상태입니다.'],
        4: ['전개', '곧 벌어질 일입니다.'],
        5: ['결과', '흐름이 끝내 닿는 곳입니다.']
      },
      combos: [[[1, 2], '3번 카드의 원인'], [[4, 5], '결과'], [[1, 5], '전체 이야기의 요약'], [[2, 4], '주제의 성격을 더 깊이']]
    },
    love: {
      name: '두 사람', sub: '관계 읽기', count: 5, grid: [[1, 0, 2], [3, 5, 4]],
      intro: '나와 상대, 두 사람의 속마음과 관계가 흘러갈 방향.',
      how: '윗줄은 겉으로 보이는 두 사람, 아랫줄은 속마음입니다. 가운데 5번이 두 사람 사이를 잇는 관계 자체입니다. 1–3, 2–4를 세로로 이어 겉과 속을 비교해 보세요.',
      positions: {
        1: ['나', '관계 안에서 지금 내가 보이는 모습입니다.'],
        2: ['상대', '관계 안에서 지금 상대가 보이는 모습입니다.'],
        3: ['나의 속마음', '내가 관계에 대해 품은 진짜 마음입니다.'],
        4: ['상대의 속마음', '상대가 말하지 않은 마음입니다.'],
        5: ['관계의 흐름', '두 사람 사이에 놓인 것, 관계가 향하는 곳입니다.']
      },
      combos: [[[1, 3], '나의 겉과 속'], [[2, 4], '상대의 겉과 속'], [[3, 5], '내 마음이 관계에 주는 영향'], [[5, 4], '관계가 상대 마음에 주는 영향']]
    },
    cross: {
      name: '십자 배열', sub: '핵심과 주변 영향', count: 5, grid: [[0, 4, 0], [1, 2, 3], [0, 5, 0]],
      intro: '가운데 카드를 두고 좌우로 시간, 위아래로 생각과 바탕을 읽습니다.',
      how: '가로줄(1–2–3)은 시간의 흐름, 세로줄(4–2–5)은 마음의 겉과 속입니다. “지금 상황의 핵심은?”처럼 하나의 질문에 잘 맞습니다.',
      positions: {
        1: ['과거 · 계기', '왼쪽. 이 일이 시작된 계기입니다.'],
        2: ['핵심', '가운데. 질문의 중심이자 지금의 상황입니다.'],
        3: ['미래 · 결과', '오른쪽. 앞으로 펼쳐질 방향입니다.'],
        4: ['생각 · 계획', '위. 머리로 알고 있는 것, 드러난 생각입니다.'],
        5: ['바탕 · 속마음', '아래. 스스로도 잘 모르는 속마음입니다.']
      },
      combos: [[[1, 2], '여기까지 온 흐름'], [[2, 3], '앞으로의 흐름'], [[4, 2], '생각이 상황에 미치는 영향'], [[2, 5], '상황 밑에 깔린 속마음']]
    },
    nine: {
      name: '9카드 (3×3)', sub: '작은 그랑 타블로', count: 9, grid: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      intro: '가로·세로·대각선으로 겹쳐 읽는 입체 배열. 어떤 주제에도 두루.',
      how: '5번이 중심입니다. 윗줄은 생각, 가운데 줄은 사건, 아랫줄은 바탕이고, 왼쪽 칸은 과거, 오른쪽 칸은 미래입니다. 줄 단위로 세 장씩 이어 읽고 대각선으로 확인합니다.',
      positions: {
        1: ['생각 × 과거', '예전부터 품어 온 생각입니다.'],
        2: ['생각 · 의식', '지금 머릿속을 차지한 것입니다.'],
        3: ['생각 × 미래', '앞날에 대해 기대하거나 염려하는 것입니다.'],
        4: ['과거', '중심 카드 바로 앞의 일입니다.'],
        5: ['중심', '질문의 핵심입니다. 모든 줄이 이 카드를 지납니다.'],
        6: ['미래', '중심 카드에서 이어질 일입니다.'],
        7: ['바탕 × 과거', '오래된 감정의 뿌리입니다.'],
        8: ['바탕 · 현실', '상황을 밑에서 받치는 현실과 감정입니다.'],
        9: ['바탕 × 미래', '바닥에서 자라는 결과입니다.']
      },
      combos: [[[1, 2, 3], '생각의 영역'], [[4, 5, 6], '사건의 흐름'], [[7, 8, 9], '바탕·현실의 영역'], [[1, 5, 9], '중심 주제의 성질'], [[3, 5, 7], '중심 주제의 성질']]
    },
    gt: {
      name: '그랑 타블로', sub: '36장 전체', count: 36, grid: gtGrid, auto: true,
      intro: '키퍼의 기본. 36장을 모두 펼치고, 키 카드에서 하우스 체인과 나이팅을 읽습니다.',
      how: '9장씩 네 줄로 36장을 모두 펼칩니다. n번 자리는 n번 카드의 집(하우스)입니다. 먼저 키 카드를 정하면 그 카드가 놓인 자리에서 체인이 시작됩니다. 그 자리에 놓인 카드의 번호를 따라 그 번호의 집으로 가고, 거기 놓인 카드의 번호를 따라 또 다음 집으로 갑니다. 이미 지나온 집으로 돌아오면 체인이 닫힙니다. 나이팅은 체스의 기사(나이트)처럼 두 칸 가고 한 칸 꺾은 자리의 카드들을 함께 읽는 기법입니다.',
      rules: [
        ['하우스 체인', '키 카드가 놓인 자리(H)부터 시작합니다. 그 자리에 놓인 카드가 X번이면 다음은 H X로 갑니다. 그 집에 놓인 카드 번호를 따라 계속 이어 가다가, 지나온 집으로 돌아오면 끝납니다.'],
        ['체인을 읽는 순서', '체인에 나온 카드를 순서대로 두 장씩 이어 한 문장으로 읽습니다. 처음 카드가 주제, 마지막 카드가 그 이야기의 끝입니다.'],
        ['짧은 체인', '카드가 자기 집에 앉아 있으면(H n에 n번 카드) 체인이 한 장으로 닫힙니다. 그 일 자체로 완결된, 뜻이 강한 카드입니다.'],
        ['나이팅', '체스의 기사처럼 가로세로로 두 칸 가고 한 칸 꺾은 자리, 최대 여덟 곳의 카드입니다. 가까이 붙어 있지 않아도 눈에 보이지 않게 이어진 영향을 말합니다.'],
        ['키 카드', '체인과 나이팅은 키 카드에서 시작합니다. 나를 볼 때는 인물 카드(여자 2 · 남자 1), 주제를 볼 때는 주제 카드(사랑 15, 돈 11, 일 34, 집 20, 건강 31)를 고릅니다.'],
        ['인물 카드의 방향', '같은 줄의 왼쪽은 지나온 일, 오른쪽은 다가올 일, 위는 생각, 아래는 현실입니다.'],
        ['맞닿은 카드', '둘러싼 카드들은 지금 가장 가깝게 영향을 주는 것입니다.'],
        ['첫 세 장 · 네 모서리', '1·2·3번 자리는 이번 타블로의 주제, 1·9·28·36번 자리는 전체를 감싸는 틀입니다.']
      ],
      positions: gtPositions,
      combos: []
    }
  };

  const TONE = { pos: '긍정', neu: '중립', neg: '부정' };
  const ASPECTS = [['health', '건강'], ['solo', '솔로'], ['couple', '커플'], ['money', '금전'], ['work', '직장'], ['person', '인물'], ['timing', '시기']];

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* 치우침 없는 난수 (0 이상 n 미만) */
  function rand(n) {
    const buf = new Uint32Array(1);
    const limit = Math.floor(0x100000000 / n) * n;
    do { crypto.getRandomValues(buf); } while (buf[0] >= limit);
    return buf[0] % n;
  }
  function shuffled(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = rand(i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ── 그림 ─────────────────────────── */
  function faceHTML(c) {
    return `<span class="face"><svg class="card-art tone-${c.tone}" viewBox="0 0 120 200" role="img" aria-label="${esc(c.ko)} 카드">` +
      '<rect class="c-bg" width="120" height="200"/><rect class="c-frame" x="6" y="6" width="108" height="188" rx="5"/>' +
      `<text class="c-num" x="60" y="28">${c.n}</text><circle class="c-tone" cx="60" cy="37" r="2"/>` +
      `<g class="c-icon" transform="translate(13 46) scale(.94)">${ART[c.n]}</g>` +
      `<text class="c-ko" x="60" y="166">${esc(c.ko)}</text><text class="c-en" x="60" y="181">${esc(c.en.toUpperCase())}</text></svg></span>`;
  }

  const BACK_SVG = '<svg class="back-art" viewBox="0 0 100 166" preserveAspectRatio="none" aria-hidden="true">' +
    '<rect class="b-ground" width="100" height="166"/>' +
    '<rect class="b-frame" x="5" y="5" width="90" height="156" rx="4"/>' +
    '<circle class="b-ring" cx="50" cy="83" r="30"/>' +
    '<path class="b-star" d="M50 55L54 79L78 83L54 87L50 111L46 87L22 83L46 79Z"/>' +
    '<path class="b-dot" d="M22 30l1.5 4.5 4.5 1.5-4.500 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5zM80 128l1.2 3.6 3.600 1.2-3.600 1.2-1.2 3.6-1.2-3.6-3.600-1.2 3.600-1.2z"/>' +
    '</svg>';

  /* ── 체인 ─────────────────────────── */
  const isPerson = (n) => n === 1 || n === 2;
  const SOOTHE = [26, 36];
  /* a가 앞, b가 뒤인 체인을 찾는다. 없으면 순서를 뒤집어 찾고 reversed 표시. */
  function findChain(a, b) {
    const hit = (x, y) => (x.chains || []).find((ch) => ch[0] === y.n || (ch[0] === 0 && isPerson(y.n)));
    const f = hit(a, b);
    if (f) return { kind: f[1], text: f[2], reversed: false };
    const r = hit(b, a);
    return r ? { kind: r[1], text: r[2], reversed: true } : null;
  }
  const partnerName = (n) => (n === 0 ? '인물(남자·여자)' : byN(n).ko);
  /* 두 장을 한 문장으로: 정해 둔 체인 풀이가 있으면 그것을, 없으면 앞 카드(주어) + 뒤 카드(서술어) */
  const PHRASE = window.PHRASE;
  function pairText(a, b) {
    const ch = findChain(a, b);
    const built = `${PHRASE[a.n][0]} ${PHRASE[b.n][1]}.`;
    if (ch && !ch.reversed) return { kind: ch.kind, text: ch.text, extra: built };
    return { kind: b.tone, text: built, extra: ch ? `(${b.ko}+${a.ko} 순서로는: ${ch.text})` : '' };
  }

  /* ── 해설 조각 ─────────────────────── */
  function tagsHTML(c) {
    return `<div class="tags"><span class="tag tone-${c.tone}">${TONE[c.tone]} 카드</span>` +
      (c.tone === 'neu' ? '<span class="tag">주변 카드 영향</span>' : '') +
      (SOOTHE.includes(c.n) ? '<span class="tag">부정 카드 완화</span>' : '') + '</div>';
  }
  function chainsHTML(c) {
    if (!c.chains || !c.chains.length) return '';
    return '<details class="chains"><summary>체인 예시</summary><ul>' + c.chains.map((ch) =>
      `<li><span class="dot tone-${ch[1]}"></span><b>${esc(c.ko)} + ${esc(partnerName(ch[0]))}</b>${esc(ch[2])}</li>`).join('') + '</ul></details>';
  }
  function bodyHTML(c) {
    return tagsHTML(c) +
      `<div><p class="sub">키워드</p><ul class="kw">${c.kw.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>` +
      (c.note ? `<p class="kw-note">${esc(c.note)}</p>` : '') + '</div>' +
      '<div><p class="sub">주제별 풀이</p><dl class="aspects">' +
      ASPECTS.filter(([k]) => c[k]).map(([k, label]) => `<dt>${label}</dt><dd>${esc(c[k])}</dd>`).join('') + '</dl></div>' +
      chainsHTML(c);
  }
  function titleHTML(c, id) {
    return `<h3${id ? ` id="${id}"` : ''}><b class="num">${c.n}</b>${esc(c.ko)} <span>${esc(c.en)}</span></h3>`;
  }
  function readingHTML(posLine, c, extra) {
    return `<div class="reading-card">${faceHTML(c)}</div>` +
      `<div class="reading-body">${posLine}${titleHTML(c)}${extra || ''}${bodyHTML(c)}</div>`;
  }
  function dialogHTML(c) {
    return `<div class="dialog-head"><div class="reading-card">${faceHTML(c)}</div><div>${titleHTML(c, 'dialogTitle')}` +
      `<p class="house-line">그랑 타블로 ${c.n}번 자리 · ${esc(HOUSES[c.n][0])}</p></div></div>` +
      `<div class="dialog-sections">${bodyHTML(c)}</div>`;
  }

  /* ── 스프레드 도식 · 자리 안내 ───────── */
  function miniHTML(s) {
    const cols = s.grid[0].length;
    const tiny = s.count > 9;
    const cells = s.grid.map((row, r) => row.map((p, c) =>
      (p ? `<i style="grid-area:${r + 1}/${c + 1}">${tiny ? '' : p}</i>` : '')).join('')).join('');
    return `<span class="mini${tiny ? ' is-tiny' : ''}" style="grid-template-columns:repeat(${cols},auto)" aria-hidden="true">${cells}</span>`;
  }
  function guideBodyHTML(s) {
    let html = `<p class="how">${esc(s.how)}</p>`;
    if (s.rules) {
      html += '<dl class="pos-list">' + s.rules.map(([t, d]) => `<dt>${esc(t)}</dt><dd>${esc(d)}</dd>`).join('') + '</dl>' +
        '<details class="houses"><summary>36개 자리(집)의 의미 모두 보기</summary><ol class="house-list">' +
        HOUSES.slice(1).map((h, i) => `<li><b>${i + 1}</b><strong>${esc(byN(i + 1).ko)}의 집 · ${esc(h[0])}</strong><span>${esc(h[1])}</span></li>`).join('') +
        '</ol></details>';
      return html;
    }
    html += '<dl class="pos-list">' + Object.keys(s.positions).map((p) =>
      `<dt><b>${p}</b>${esc(s.positions[p][0])}</dt><dd>${esc(s.positions[p][1])}</dd>`).join('') + '</dl>';
    if (s.combos.length) {
      html += '<p class="sub">묶어 읽기</p><ul class="combo-list">' + s.combos.map(([ps, label]) =>
        `<li><b>${ps.map((p) => p + '번').join(' + ')}</b>${esc(label)}</li>`).join('') + '</ul>';
    }
    return html;
  }

  /* ── 함께 읽기 ─────────────────────── */
  function tallyHTML(cards) {
    const count = { pos: 0, neu: 0, neg: 0 };
    cards.forEach((c) => { count[c.tone]++; });
    return { count, html: `<p class="tally"><span class="tone-pos">긍정 ${count.pos}</span><span class="tone-neu">중립 ${count.neu}</span><span class="tone-neg">부정 ${count.neg}</span></p>` };
  }
  function chainLine(a, b) {
    const ch = findChain(a, b);
    if (!ch) return '';
    return `<span class="chain-hit"><span class="dot tone-${ch.kind}"></span>${esc(ch.text)}` +
      (ch.reversed ? ` <em>(${esc(b.ko)}+${esc(a.ko)} 순서의 체인)</em>` : '') + '</span>';
  }
  function togetherHTML(s, at) {
    const cards = Object.keys(s.positions).map((p) => at[p]);
    if (s.count === 1) {
      const c = cards[0];
      const verdict = { pos: ['YES', '긍정 카드입니다. YES or NO 질문이라면 답은 YES 쪽입니다.'], neg: ['NO', '부정 카드입니다. YES or NO 질문이라면 답은 NO 쪽입니다.'], neu: ['—', '중립 카드입니다. YES도 NO도 아닌, 상황과 내 행동에 달린 답입니다. 한 장을 더 뽑아 이어 읽어도 좋습니다.'] }[c.tone];
      return `<h3>한 장의 답</h3><p class="verdict tone-${c.tone}"><b>${verdict[0]}</b>${esc(verdict[1])}</p>`;
    }
    const t = tallyHTML(cards);
    const lines = [];
    if (t.count.pos > t.count.neg) lines.push('긍정 카드가 더 많습니다. 전체 흐름은 밝은 쪽으로 기울어 있습니다.');
    else if (t.count.neg > t.count.pos) lines.push('부정 카드가 더 많습니다. 서두르기보다 걸림돌이 무엇인지 먼저 살필 때입니다.');
    else lines.push('긍정과 부정이 팽팽합니다. 중심 카드와 마지막 카드가 어느 쪽 손을 들어 주는지 보세요.');
    const soothers = cards.filter((c) => SOOTHE.includes(c.n));
    const negs = cards.filter((c) => c.tone === 'neg');
    if (soothers.length && negs.length) lines.push(`${soothers.map((c) => c.ko).join(', ')} 카드가 ${negs.map((c) => c.ko).join(', ')} 카드의 부정적인 기운을 덜어 줍니다.`);
    const neutrals = cards.filter((c) => c.tone === 'neu');
    if (neutrals.length) lines.push(`${neutrals.map((c) => c.ko).join(', ')} 카드는 중립입니다. 바로 옆 카드의 색을 입혀 읽으세요.`);

    const combos = s.combos.map(([ps, label]) => {
      const cs = ps.map((p) => at[p]);
      const hits = [];
      for (let i = 0; i + 1 < cs.length; i++) { const h = chainLine(cs[i], cs[i + 1]); if (h) hits.push(h); }
      return `<li><p class="combo-head"><b>${ps.map((p) => p + '번').join(' + ')}</b>${esc(label)}</p>` +
        `<p class="combo-cards">${cs.map((c) => `<span class="tone-${c.tone}"><span class="dot"></span>${esc(c.ko)}</span>`).join('<i>+</i>')}</p>${hits.join('')}</li>`;
    }).join('');

    return '<h3>함께 읽기</h3>' + t.html +
      `<ul class="plain">${lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>` +
      (combos ? `<p class="sub">묶어 읽기</p><ul class="combos">${combos}</ul>` : '');
  }

  /* ── 상태 ─────────────────────────── */
  const state = { spreadKey: 'gt', deck: [], at: {}, picked: 0, flipped: new Set(), question: '', sig: 2, sel: null };
  const spread = () => SPREADS[state.spreadKey];
  const ORDER = ['gt'].concat(Object.keys(SPREADS).filter((k) => k !== 'gt'));
  const ordered = () => ORDER.map((k) => [k, SPREADS[k]]);

  function renderSpreadOptions() {
    $('spreadOptions').innerHTML = ordered().map(([key, s]) =>
      `<label class="spread-option"><input type="radio" name="spread" value="${key}"${key === state.spreadKey ? ' checked' : ''}>` +
      `<span class="spread-card">${miniHTML(s)}` +
      `<span><strong>${esc(s.name)}</strong><em>${esc(s.sub)} · ${s.count}장</em><p>${esc(s.intro)}</p></span>` +
      '</span></label>').join('');
  }
  function renderSpreadBook() {
    $('spreadList').innerHTML = ordered().map(([key, s]) =>
      `<article class="spread-entry" id="spread-${key}"><header>${miniHTML(s)}<div><h3>${esc(s.name)}</h3><p class="entry-sub">${esc(s.sub)} · ${s.count}장</p></div></header>` +
      `${guideBodyHTML(s)}</article>`).join('');
  }

  /* ── 테이블 ───────────────────────── */
  function startReading() {
    const s = spread();
    state.deck = shuffled(CARDS);
    state.at = {};
    state.picked = 0;
    state.flipped = new Set();
    state.sel = null;

    $('table').hidden = false;
    $('tableActions').hidden = true;
    $('together').hidden = true;
    $('sigPick').hidden = !s.auto;
    $('gtLegend').hidden = !s.auto;
    $('spreadTitle').textContent = `${s.name} · ${s.sub}`;
    const asked = $('asked');
    asked.hidden = !state.question;
    asked.textContent = state.question;

    $('posGuide').innerHTML = `<summary>이 스프레드의 자리 의미</summary>${guideBodyHTML(s)}`;
    $('posGuide').open = !s.auto;

    const layout = $('layout');
    layout.dataset.spread = state.spreadKey;
    layout.style.gridTemplateColumns = `repeat(${s.grid[0].length}, var(--cw))`;
    const deck = $('deck');

    if (s.auto) {
      deck.classList.add('is-done');
      deck.innerHTML = '';
      $('readings').innerHTML = '<article class="reading" id="gtDetail" hidden></article>';
      state.deck.forEach((c, i) => { state.at[i + 1] = c; });
      layout.innerHTML = state.deck.map((c, i) => {
        const p = i + 1;
        return `<button type="button" class="gt-cell" data-pos="${p}" style="grid-area:${GT_RC[p][0] + 1}/${GT_RC[p][1] + 1};--i:${i}" aria-label="${p}번 자리 ${esc(byN(p).ko)}의 집: ${esc(c.ko)}">` +
          `<span class="gt-house"><b>${p}</b>${esc(byN(p).ko)}의 집</span>${faceHTML(c)}</button>`;
      }).join('');
      $('tableActions').hidden = false;
      $('flipAll').hidden = true;
      updateGT(true);
    } else {
      deck.classList.remove('is-done');
      deck.innerHTML = state.deck.map((_, i) =>
        `<button type="button" class="deck-card" style="--i:${i}" data-i="${i}" aria-label="${i + 1}번째 카드 뽑기">${BACK_SVG}</button>`).join('');
      layout.innerHTML = s.grid.map((row, r) => row.map((p, c) => (p ?
        `<div class="slot" data-pos="${p}" style="grid-area:${r + 1}/${c + 1}">` +
        `<div class="slot-label"><b>${p}</b>${esc(s.positions[p][0])}</div>` +
        `<div class="slot-hole">${p}</div><div class="slot-name"></div></div>` : '')).join('')).join('');
      $('readings').innerHTML = Object.keys(s.positions).map((p) =>
        `<article class="reading" data-pos="${p}" hidden></article>`).join('');
    }
    updateStatus();
  }

  function updateStatus() {
    const s = spread();
    let msg;
    if (s.auto) {
      msg = '36장을 모두 펼쳤습니다. 키 카드에서 하우스 체인과 나이팅이 이어집니다. 다른 카드를 누르면 그 카드의 풀이가 열립니다.';
    } else {
      const left = s.count - state.picked;
      if (left > 0) {
        msg = state.picked === 0 ? `질문을 떠올리며 마음이 가는 카드를 ${s.count}장 골라 주세요.` : `${left}장 더 골라 주세요.`;
      } else if (state.flipped.size < s.count) {
        msg = '카드를 눌러 뒤집어 보세요.';
      } else {
        msg = s.count > 1 ? '1번 자리부터 차례로, 옆 카드와 이어서 읽어 보세요.' : '카드가 건네는 답을 읽어 보세요.';
      }
    }
    $('status').textContent = msg;
  }

  function pick(i) {
    const s = spread();
    if (state.picked >= s.count) return;
    const card = state.deck[i];
    const pos = ++state.picked;
    state.at[pos] = card;

    const slot = $('layout').querySelector(`.slot[data-pos="${pos}"]`);
    slot.querySelector('.slot-hole').outerHTML =
      `<button type="button" class="flip" data-pos="${pos}" aria-label="${pos}번 자리 카드 뒤집기">` +
      `<span class="flip-inner"><span class="side back">${BACK_SVG}</span>` +
      `<span class="side front">${faceHTML(card)}</span></span></button>`;

    if (state.picked === s.count) {
      $('deck').classList.add('is-done');
      $('tableActions').hidden = false;
      $('flipAll').hidden = false;
      const first = $('layout').querySelector('.flip[data-pos="1"]');
      if (first) first.focus({ preventScroll: true });
    }
    updateStatus();
  }

  function flip(pos, quiet) {
    pos = Number(pos);
    if (state.flipped.has(pos) || !state.at[pos]) return;
    state.flipped.add(pos);
    const c = state.at[pos];
    const s = spread();

    const slot = $('layout').querySelector(`.slot[data-pos="${pos}"]`);
    const btn = slot.querySelector('.flip');
    btn.classList.add('is-flipped');
    btn.setAttribute('aria-label', `${pos}번 자리: ${c.ko} (${TONE[c.tone]})`);
    slot.querySelector('.slot-name').innerHTML = `<span class="dot tone-${c.tone}"></span>${esc(c.ko)}`;

    const article = $('readings').querySelector(`.reading[data-pos="${pos}"]`);
    const posLine = `<p class="pos"><b>${pos}</b>${esc(s.positions[pos][0])}</p><p class="pos-desc">${esc(s.positions[pos][1])}</p>`;
    article.innerHTML = readingHTML(posLine, c);
    article.hidden = false;

    const done = state.flipped.size === s.count;
    if (done) {
      $('flipAll').hidden = true;
      $('together').innerHTML = togetherHTML(s, state.at);
      $('together').hidden = false;
    }
    updateStatus();
    if (!quiet && done) setTimeout(() => $('together').scrollIntoView({ block: 'start' }), 700);
  }

  /* 받침에 맞는 조사 */
  const roJo = (w) => { const ch = w.charCodeAt(w.length - 1) - 0xAC00; return ch >= 0 && ch < 11172 && ch % 28 && ch % 28 !== 8 ? '으로' : '로'; };
  const jo = (w, withB, noB) => { const ch = w.charCodeAt(w.length - 1); return ch >= 0xAC00 && ch <= 0xD7A3 && (ch - 0xAC00) % 28 ? withB : noB; };
  /* ── 그랑 타블로 · 하우스 체인 · 나이팅 ─────── */
  const posOf = (n) => Number(Object.keys(state.at).find((p) => state.at[p].n === n));
  const rc = (p) => GT_RC[p];
  const at = (r, c) => GT_AT[`${r},${c}`] || 0;
  const cardBtn = (p) => { const c = state.at[p]; return `<button type="button" class="link tone-${c.tone}" data-go="${p}"><span class="dot"></span>${esc(c.ko)}</button>`; };

  /* 하우스 체인: H에 놓인 카드 번호 → 그 번호의 집 → … 지나온 집으로 돌아오면 끝 */
  function houseChain(start) {
    const out = [];
    const seen = new Set();
    let h = start;
    while (h >= 1 && h <= 36 && !seen.has(h)) {
      seen.add(h);
      out.push(h);
      h = state.at[h].n;
    }
    return { houses: out, back: h };
  }
  /* 나이팅: 체스 기사처럼 두 칸 + 한 칸 꺾은 자리 */
  const KNIGHT = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
  function knights(p) {
    const [r, c] = rc(p);
    return KNIGHT.map(([dr, dc]) => at(r + dr, c + dc)).filter(Boolean);
  }
  function neighbors(p) {
    const [r, c] = rc(p);
    const out = [];
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) { if (dr || dc) { const q = at(r + dr, c + dc); if (q) out.push(q); } }
    return out;
  }
  function linkHTML(a, b, head) {
    const t = pairText(a, b);
    return `<li><p class="link-head"><span class="dot tone-${t.kind}"></span><b>${head || `${esc(a.ko)} → ${esc(b.ko)}`}</b></p>` +
      `<p class="link-text">${esc(t.text)}</p>${t.extra ? `<p class="link-extra">${esc(t.extra)}</p>` : ''}</li>`;
  }
  const houseTag = (h) => `H${h} ${esc(byN(h).ko)}의 집`;

  function chainSection(start) {
    const { houses, back } = houseChain(start);
    const cs = houses.map((h) => state.at[h]);
    const strip = houses.map((h) => {
      const c = state.at[h];
      return `<button type="button" class="step tone-${c.tone}" data-go="${h}"><small>H${h}</small><span class="dot"></span>${esc(c.ko)}</button>`;
    }).join('<i class="arrow" aria-hidden="true">›</i>') +
      `<i class="arrow" aria-hidden="true">›</i><span class="step-end">H${back}에 돌아옴</span>`;
    const steps = houses.map((h, i) => {
      const c = state.at[h];
      const next = i + 1 < houses.length ? `다음은 ${c.n}번 카드이니 H${c.n} 집으로 갑니다.` : `${c.n}번 카드이니 H${c.n} 집으로 가야 하지만, 이미 지나온 집이라 체인이 닫힙니다.`;
      return `<li><p class="link-head"><span class="dot tone-${c.tone}"></span><b>${houseTag(h)}</b> · ${esc(c.ko)}</p>` +
        `<p class="link-extra">${esc(HOUSES[h][0])}의 자리에 ${esc(c.ko)}${jo(c.ko, '이', '가')} 놓였습니다. ${next}</p></li>`;
    }).join('');
    const pairs = cs.slice(1).map((c, i) => linkHTML(cs[i], c)).join('');
    const count = { pos: 0, neu: 0, neg: 0 };
    cs.forEach((c) => { count[c.tone]++; });
    let summary;
    if (houses.length === 1) summary = `${cs[0].ko} 카드가 자기 집에 앉아 체인이 한 장으로 닫힙니다. 그 자체로 완결된 이야기이고, 뜻이 아주 강합니다.`;
    else {
      const last = cs[cs.length - 1].ko;
      summary = `체인은 ${houses.length}장으로 이어지고 H${back}에 돌아와 닫힙니다. ` +
        `${cs[0].ko}에서 시작해 ${last}${roJo(last)} 끝나는 이야기입니다. ` +
        (count.pos > count.neg ? '긍정 카드가 많아 밝게 흘러갑니다.' : count.neg > count.pos ? '부정 카드가 많아 걸림돌을 먼저 살펴야 합니다.' : '긍정과 부정이 엇갈립니다. 마지막 카드가 어느 쪽인지 보세요.');
    }
    return '<section class="chain-box">' +
      `<header><h4>하우스 체인</h4><span class="dir">시작 H${start} · 길이 ${houses.length}</span></header>` +
      `<p class="chain-strip">${strip}</p><p class="chain-sum">${esc(summary)}</p>` +
      (pairs ? `<p class="sub">이어 읽기</p><ol class="chain-links">${pairs}</ol>` : '') +
      `<details class="chain-steps"><summary>집을 따라간 길</summary><ol class="chain-links">${steps}</ol></details>` +
      '</section>';
  }

  function knightSection(p) {
    const c = state.at[p];
    const ks = knights(p);
    return '<section class="chain-box">' +
      `<header><h4>나이팅</h4><span class="dir">${esc(c.ko)}에서 기사 이동 · ${ks.length}곳</span></header>` +
      '<p class="dir-desc">두 칸 가고 한 칸 꺾은 자리의 카드들입니다. 맞닿지 않았지만 숨어서 영향을 주는 일입니다.</p>' +
      `<p class="chain-strip">${ks.map(cardBtn).join('')}</p>` +
      `<ol class="chain-links">${ks.map((q) => linkHTML(c, state.at[q], `${esc(c.ko)} ⇢ ${esc(state.at[q].ko)} <small>H${q}</small>`)).join('')}</ol>` +
      '</section>';
  }

  function renderKeyPick() {
    const opts = CARDS.map((c) => `<option value="${c.n}">${c.n} ${esc(c.ko)}</option>`).join('');
    $('keyStart').innerHTML = opts;
    $('keyStart').value = String(state.sig);
    $('keySelect').innerHTML = CARDS.map((c) => `<option value="${c.n}">${c.n} ${esc(c.ko)}</option>`).join('');
  }

  /* 체인과 나이팅은 언제나 키 카드에서 시작한다. 다른 카드를 누르면 그 카드의 풀이만 연다. */
  function updateGT(first) {
    const kp = posOf(state.sig);
    if (first || state.sel == null) state.sel = kp;
    const sel = state.sel;
    const chain = houseChain(kp).houses;
    const ks = knights(kp);

    $('layout').querySelectorAll('.gt-cell').forEach((cell) => {
      const q = Number(cell.dataset.pos);
      const ci = chain.indexOf(q);
      cell.classList.toggle('is-sig', q === kp);
      cell.classList.toggle('is-sel', q === sel);
      cell.classList.toggle('is-line', ci >= 0);
      cell.classList.toggle('is-knight', ks.includes(q));
      cell.dataset.step = ci >= 0 ? ci + 1 : '';
    });
    $('sigPick').querySelectorAll('.chip').forEach((b) => {
      const on = Number(b.dataset.sig) === state.sig;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    $('keySelect').value = String(state.sig);

    const key = byN(state.sig);
    const leads = [`키 카드 <b>${esc(key.ko)}</b>${jo(key.ko, '은', '는')} <b>H${kp} · ${esc(byN(kp).ko)}의 집</b>(${esc(HOUSES[kp][0])})에 놓였습니다. 체인과 나이팅은 <b>${esc(key.ko)}</b>에서 시작합니다.`];
    if (isPerson(key.n)) {
      const other = 3 - key.n;
      const op = posOf(other);
      const [r1, c1] = rc(kp);
      const [r2, c2] = rc(op);
      const dist = Math.max(Math.abs(r1 - r2), Math.abs(c1 - c2));
      leads.push(`상대 카드 <b>${esc(byN(other).ko)}</b>${jo(byN(other).ko, '은', '는')} H${op}에 있고 ${dist}칸 떨어져 있습니다. ` +
        (chain.includes(op) ? `두 사람이 한 체인 안에 들어 있습니다(${chain.indexOf(op) + 1}번째). 서로의 이야기가 이어져 있습니다. ` : '') +
        (ks.includes(op) ? '상대가 나이팅 자리에 있습니다. 드러나지 않게 서로 영향을 주고받습니다.' : ''));
    }
    const near = neighbors(kp);
    const t = tallyHTML(near.map((q) => state.at[q]));
    $('together').innerHTML = `<h3>키 카드 ${esc(key.ko)}의 체인과 나이팅</h3>` +
      leads.map((l) => `<p class="gt-lead">${l}</p>`).join('') +
      `<div class="chain-lines">${chainSection(kp)}${knightSection(kp)}</div>` +
      '<p class="sub">그 밖에 볼 자리</p><dl class="gt-groups">' +
      `<dt>맞닿은 카드<small>키 카드를 둘러싼 영향</small></dt><dd>${near.map(cardBtn).join('')}</dd>` +
      `<dt>타블로의 주제<small>첫 세 장</small></dt><dd>${[1, 2, 3].map(cardBtn).join('')}</dd>` +
      `<dt>전체의 틀<small>네 모서리</small></dt><dd>${[1, 9, 28, 36].map(cardBtn).join('')}</dd>` +
      '</dl>' +
      `<p class="sub">맞닿은 카드의 성격</p>${t.html}` +
      '<p class="fine">카드를 누르면 아래에 그 카드의 풀이가 열립니다. 키 카드를 바꾸려면 위의 키 카드 버튼이나, 풀이 속 ‘키 카드로’ 버튼을 누르세요.</p>';
    $('together').hidden = false;
    renderGTDetail();
  }

  function renderGTDetail() {
    const p = state.sel;
    const c = state.at[p];
    const owner = byN(p);
    const kp = posOf(state.sig);
    const chain = houseChain(kp).houses;
    const posLine = `<p class="pos"><b>${p}</b>${esc(owner.ko)}의 집 · ${esc(HOUSES[p][0])}</p><p class="pos-desc">${esc(HOUSES[p][1])}</p>`;
    const notes = [];
    if (c.n === state.sig) notes.push('지금의 키 카드입니다. 체인과 나이팅이 이 카드에서 시작합니다.');
    else if (chain.includes(p)) notes.push(`키 카드 체인의 ${chain.indexOf(p) + 1}번째 카드입니다.`);
    if (knights(kp).includes(p)) notes.push('키 카드의 나이팅 자리에 있는 카드입니다.');
    if (c.n === p) notes.push('자기 집에 앉은 카드입니다. 이 카드의 뜻이 한층 또렷하고 강하게 드러납니다.');
    else notes.push(`‘${owner.ko}의 집’이 다루는 ${HOUSES[p][0]}에 ${c.ko} 카드의 ${c.kw.slice(0, 3).join('·')} 기운이 들어와 있습니다.`);
    const [r, col] = rc(p);
    const nb = [];
    const L = at(r, col - 1), R = at(r, col + 1), U = at(r - 1, col), D = at(r + 1, col);
    if (L) nb.push(linkHTML(state.at[L], c));
    if (R) nb.push(linkHTML(c, state.at[R]));
    if (U) nb.push(linkHTML(state.at[U], c));
    if (D) nb.push(linkHTML(c, state.at[D]));
    const extra = `<ul class="plain house-notes">${notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>` +
      (c.n === state.sig ? '' : `<p><button type="button" class="ghost key-btn" data-key="${c.n}">${esc(c.ko)}${jo(c.ko, '을', '를')} 키 카드로</button></p>`) +
      `<div><p class="sub">이웃 카드와 잇기</p><ol class="chain-links">${nb.join('')}</ol></div>`;
    const article = $('gtDetail');
    article.innerHTML = readingHTML(posLine, c, extra);
    article.hidden = false;
  }

  /* 카드를 고르면 그 카드의 풀이만 연다 (체인은 키 카드 그대로) */
  function selectGT(p, scroll) {
    state.sel = Number(p);
    $('layout').querySelectorAll('.gt-cell').forEach((cell) => cell.classList.toggle('is-sel', Number(cell.dataset.pos) === state.sel));
    renderGTDetail();
    if (scroll) $('gtDetail').scrollIntoView({ block: 'start' });
  }

  function setKey(n, scroll) {
    if (!n) return;
    state.sig = Number(n);
    $('keyStart').value = String(state.sig);
    updateGT(true);
    if (scroll) $('together').scrollIntoView({ block: 'start' });
  }

  /* ── 도감 ─────────────────────────── */
  function renderLibrary() {
    $('cardGrid').innerHTML = CARDS.map((c, i) =>
      `<button type="button" class="card-tile" data-i="${i}" data-tone="${c.tone}" aria-label="${esc(c.ko)} 풀이 보기">` +
      `${faceHTML(c)}<span class="tile-name"><b>${c.n}</b>${esc(c.ko)}</span></button>`).join('');
    const n = (t) => CARDS.filter((c) => c.tone === t).length;
    $('cntAll').textContent = CARDS.length;
    $('cntPos').textContent = n('pos');
    $('cntNeu').textContent = n('neu');
    $('cntNeg').textContent = n('neg');
  }

  /* ── 이벤트 ───────────────────────── */
  $('setup').addEventListener('submit', (e) => {
    e.preventDefault();
    const checked = document.querySelector('input[name="spread"]:checked');
    if (checked) state.spreadKey = checked.value;
    state.question = $('question').value.trim();
    state.sig = Number($('keyStart').value) || 2;
    startReading();
    $('table').scrollIntoView({ block: 'start' });
  });

  $('deck').addEventListener('click', (e) => {
    const btn = e.target.closest('.deck-card');
    if (!btn || btn.classList.contains('is-taken')) return;
    btn.classList.add('is-taken');
    btn.disabled = true;
    pick(Number(btn.dataset.i));
  });

  $('layout').addEventListener('click', (e) => {
    const cell = e.target.closest('.gt-cell');
    if (cell) { selectGT(cell.dataset.pos, true); return; }
    const btn = e.target.closest('.flip');
    if (btn) flip(btn.dataset.pos);
  });

  $('together').addEventListener('click', (e) => {
    const go = e.target.closest('[data-go]');
    if (go) selectGT(go.dataset.go, true);
  });

  $('sigPick').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) setKey(chip.dataset.sig);
  });
  $('keySelect').addEventListener('change', (e) => setKey(e.target.value));
  $('readings').addEventListener('click', (e) => {
    const k = e.target.closest('.key-btn');
    if (k) setKey(k.dataset.key, true);
  });

  $('flipAll').addEventListener('click', () => {
    const rest = Object.keys(state.at).map(Number).filter((p) => !state.flipped.has(p)).sort((a, b) => a - b);
    rest.forEach((p, i) => setTimeout(() => flip(p, i < rest.length - 1), i * 260));
  });

  $('redraw').addEventListener('click', () => {
    startReading();
    $('table').scrollIntoView({ block: 'start' });
  });

  $('filters').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    const tone = chip.dataset.tone;
    $('filters').querySelectorAll('.chip').forEach((b) => {
      const on = b === chip;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    $('cardGrid').querySelectorAll('.card-tile').forEach((t) => {
      t.hidden = tone !== 'all' && t.dataset.tone !== tone;
    });
  });

  const dialog = $('cardDialog');
  $('cardGrid').addEventListener('click', (e) => {
    const tile = e.target.closest('.card-tile');
    if (!tile) return;
    $('dialogBody').innerHTML = dialogHTML(CARDS[Number(tile.dataset.i)]);
    dialog.showModal();
    dialog.scrollTop = 0;
  });
  $('dialogClose').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  renderKeyPick();
  renderSpreadOptions();
  /* 키 카드 선택은 그랑 타블로일 때만 보인다 */
  const syncKeyField = () => {
    const c = document.querySelector('input[name="spread"]:checked');
    $('keyField').hidden = !c || !SPREADS[c.value].auto;
  };
  $('spreadOptions').addEventListener('change', syncKeyField);
  syncKeyField();
  renderSpreadBook();
  renderLibrary();
})();
