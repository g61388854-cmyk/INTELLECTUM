// INTELLECTUM · Prompt collection
// Чтобы добавить новый промпт:
//  1. Положите изображение в assets/images/ (или укажите внешнюю ссылку в image).
//  2. Добавьте объект в массив PROMPTS ниже.
//  3. Поле prompt — JS-объект, его отрисует pretty-printer.
// Поле category используется для фильтра (portrait | product | editorial).

window.PROMPTS = [
  {
    id: "han095-luxury-portrait",
    title: "ХАН095 · Luxury Portrait",
    subtitle: "Премиальный портрет-кампейн с референс-бутылкой и автомобильной эстетикой.",
    category: "portrait",
    tag: "Portrait · Reference Lock",
    image: "assets/images/han095-luxury-portrait.jpg",
    imageAlt: "Референсное фото для промпта ХАН095",
    meta: ["4K", "nano-banana-pro", "Magnific 2x"],
    prompt: {
      model: "nano-banana-pro",
      resolution: "4K",
      mode: "reference_enhancement",
      identity_lock: {
        instruction: "Absolute fidelity to provided reference image. The generated subject MUST be exactly the same person from the reference. Preserve facial anatomy, proportions, identity, beard, hairstyle, expression, gaze, pose, camera angle, framing, and perspective with zero deviation. Face must match 1:1 with the reference. No alterations allowed."
      },
      framing: {
        shot_type: "head and shoulders portrait",
        composition: "Full head completely visible in frame — both ears, full hairline, forehead, chin, jaw, neck all uncut. Both shoulders at bottom edge. Hands partially visible in lower frame interacting with the bottle from the reference. Centered, symmetrical premium fashion portrait.",
        background: "Pure solid black (#000000) or pure solid white (#FFFFFF). No gradients, no texture. Seamless luxury studio background.",
        head_position: "Strictly as in reference — straight forward gaze, no rotation, no tilt, no reposing."
      },
      subject: {
        body_part: "full head and shoulders — forehead, eyes, ears, nose, lips, chin, jaw, neck, hair, shoulders, hands",
        skin_tone: "natural warm medium tone with realistic variation",
        imperfections: [
          "[forehead: pores, natural skin texture]",
          "[eyes: detailed iris, natural reflections, slight under-eye texture]",
          "[ears: helix, antihelix, tragus, concha fully visible]",
          "[nose: natural pores and texture]",
          "[lips: natural texture lines, slight asymmetry]",
          "[neck: natural skin texture]",
          "[hair: silky, groomed, dense, clean strand separation, subtle shine]"
        ]
      },
      prompt: "Ultra-high-resolution professional portrait photograph strictly based on the provided reference identity. The face MUST remain exactly the same as the reference — identical facial structure, beard, hairstyle, proportions, and expression. No reinterpretation. Subject faces straight forward exactly as in reference — no rotation, no tilt, no reposing. Full head completely in frame. Clean seamless studio background. Highly unusual high-fashion portrait with a luxury automotive-inspired aesthetic. Subject wears a tailored premium suit (Mercedes-inspired elegance: ivory, black or deep charcoal tones), perfectly fitted, minimalistic but expensive look, possibly with a refined cap featuring a subtle automotive-style emblem. The subject is drinking juice strictly from the exact bottle shown in the reference: the bottle design, shape, label placement, color, cap, proportions and liquid must be preserved 1:1 with the reference — no redesign, no simplification. The action is captured mid-sip directly from the bottle, lips naturally touching the bottle opening, no distortion of identity, expression remains calm and controlled. Hands hold the bottle naturally and consistently with its real proportions. Liquid inside the bottle must match the reference color and density exactly, with realistic transparency and highlights. Subtle integration of restaurant branding 'ХАН095': extremely refined and minimal (micro-engraving on bottle cap, discreet detail on suit cuff, or barely visible accessory element), no aggressive advertising. Shot on medium format film with 85mm lens equivalent, f/4, ISO 100. Soft diffused studio lighting slightly above eye level, with a delicate secondary highlight enhancing bottle reflections and liquid clarity while preserving clean facial lighting. Skin rendered with full micro-detail: pores, natural variation. Hair silky and well-groomed. Beard natural and detailed. Extremely sharp focus, high microcontrast, no blur. Fine organic film grain. No retouching, no smoothing, no beauty filters. Maintain realistic, raw but premium editorial look. Result must look like a high-end fashion-meets-product campaign image — strict reference accuracy, minimal, unusual, and fully realistic.",
      negative_prompt: "identity change, different face, altered beard, altered hair, modified bottle design, incorrect label, wrong proportions of bottle, new packaging, glass instead of bottle, distorted face during drinking, exaggerated expression, cartoon, CGI, plastic skin, smooth skin, beauty filter, over-retouch, blur, low quality, warped face, asymmetry errors, head tilt, head rotation, cropped head, busy background, gradient background, aggressive logos, oversized branding, cheap styling, unrealistic liquid, fake reflections, text overlays, watermarks",
      upscale: {
        tool: "Magnific AI",
        preset: "Low",
        scale: "2x",
        creativity: -3,
        hdr: 0,
        resemblance: 3,
        fractality: 0,
        upscale_prompt: "Enhance micro skin detail, beard texture, fabric quality, and bottle/liquid realism while preserving exact identity and full head framing."
      }
    }
  }
];
