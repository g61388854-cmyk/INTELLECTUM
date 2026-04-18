// INTELLECTUM · Prompt collection
// Чтобы добавить новый промпт:
//  1. Положите изображение в assets/images/ (или укажите внешнюю ссылку в image).
//  2. Добавьте объект в массив PROMPTS ниже.
//  3. Поле prompt — JS-объект, его отрисует pretty-printer.
// Поле category используется для фильтра (portrait | product | editorial).

window.PROMPTS = [
  {
    id: "pale-casting-portrait",
    title: "Pale Casting · Editorial Test Shot",
    subtitle: "Сырой casting-портрет в духе elite model agency: фарфоровая кожа, вытянутые пропорции, дермaтологическая макро-детализация.",
    category: "editorial",
    tag: "Editorial · Reference Lock",
    image: "assets/images/pale-casting-portrait.jpg",
    imageAlt: "Референс бледной модели — editorial casting test shot",
    meta: ["4K", "nano-banana-pro", "Magnific 2x"],
    prompt: {
      model: "nano-banana-pro",
      resolution: "4K",
      mode: "reference_enhancement",
      identity_lock: {
        instruction: "Absolute fidelity to provided reference image. Preserve facial anatomy, proportions, identity, expression, gaze, pose, camera angle, framing, and perspective with zero deviation. Subject looks straight into camera exactly as in reference. Clothing and hair must remain unchanged."
      },
      framing: {
        shot_type: "head and shoulders portrait",
        composition: "Full head completely visible in frame — both ears, full hairline, forehead, chin, jaw, neck all uncut. Both shoulders at bottom edge. Zero cropping of any part of the head. Centered, symmetrical elite model agency test shot framing.",
        background: "Pure solid black (#000000) or pure solid white (#FFFFFF). No gradients, no texture. Seamless high-end studio background.",
        head_position: "Strictly as in reference — straight forward gaze, no rotation, no tilt, no reposing."
      },
      subject: {
        body_part: "full head and shoulders — forehead, eyes, ears, nose, lips, chin, jaw, neck, hair, shoulders",
        skin_tone: "very pale cool porcelain with subtle desaturated undertones and natural unevenness",
        imperfections: [
          "[forehead: visible pores, faint irregular skin texture, subtle dryness zones]",
          "[eyes: extremely detailed iris fibers, slightly glassy moisture, natural tired undertone, fine under-eye texture]",
          "[ears: sharp anatomical definition — helix, antihelix, tragus, concha fully resolved]",
          "[nose: narrow bridge, visible pore texture, slightly raw natural skin variation]",
          "[lips: dry natural texture, soft asymmetry, muted color, vertical micro-lines]",
          "[neck: thin structure, visible tendons, subtle skin translucency]",
          "[hair: silky smooth texture, clean strand separation, soft natural shine, controlled flyaways, healthy density, polished flow from roots to ends]"
        ]
      },
      prompt: "Ultra-high-resolution professional portrait photograph of a real person based strictly on the provided reference. Subject faces straight forward exactly as in reference — no rotation, no tilt, no reposing. Full head completely in frame — both ears fully visible, complete hairline at top, chin and jaw fully present, neck and both shoulders at bottom edge. Pure seamless studio background. Ultra-realistic elite model agency test shot with an unconventional high-fashion casting look. The subject has an unusual model-type appearance: elongated facial proportions, extremely pronounced cheekbones, hollow cheeks, narrow jawline, slightly sunken eyes, sharp bone structure, subtle asymmetry enhancing uniqueness. Expression is neutral, detached, almost emotionless — raw casting presence. Shot on medium format film with 85mm lens equivalent, f/4, ISO 100. Identical soft diffused studio lighting: frontal soft light slightly above eye level, minimal shadowing, gentle wrap light creating faint sculpting under cheekbones and jawline, evenly balanced exposure, neutral-cool color temperature. Every facial zone rendered with dermatological macro-level precision simultaneously across the full portrait: forehead with visible pore structure and uneven micro-texture; eyes with extremely detailed iris fibers, slight wetness, subtle redness, natural fatigue; both ears fully resolved — helix, antihelix, tragus, concha, earlobe all visible; nose with full pore detail and natural variation; lips with dry texture and natural irregularities; jaw and chin sharply defined with thin skin revealing bone structure; neck with visible tendons and translucency. Hair appears silky, smooth, and healthy — refined high-fashion quality with natural shine, clean strand separation, controlled volume, minimal frizz, elegant fall along the sides while maintaining realistic micro-detail. Realistic subsurface scattering with desaturated tones, visible capillary variation, subtle discoloration, micro-wrinkles between features. Extremely sharp focus with high microcontrast, no blur. Fine organic film grain throughout. All sharpness is optical — zero digital sharpening. Lifted blacks — shadow detail preserved. Soft highlight rolloff — no clipping. No makeup, no retouching, no smoothing, no filters. Maintain original color science, slightly desaturated editorial tone. Remove compression artifacts while preserving authentic raw texture. Result must look like a raw high-fashion casting photo — unconventional, slightly unsettling, but completely real.",
      negative_prompt: "cropped ears, cropped hairline, cropped chin, partial head, cut-off face, head rotation, head tilt, reposing, busy background, gradient background, airbrushed skin, smooth skin, uniform tone, beauty lighting, ring light, porcelain perfection, plastic, silicone, CGI, digital sharpening halos, symmetrical pore patterns, flat lighting, glam look, fashion retouching, makeup, perfect skin, glossy beauty skin, greasy hair, dirty hair, frizzy hair, tangled hair, warping, facial drift, distortions, hallucinated detail, stylized rendering, artificial gloss, smoothing filters, text, logos, watermarks, over-retouched skin, beauty filter, waxy skin, doll face, anime, cartoon, unrealistic hair shine, heavy makeup, perfect symmetry, blur, low quality",
      upscale: {
        tool: "Magnific AI",
        preset: "Low",
        scale: "2x",
        creativity: -3,
        hdr: 0,
        resemblance: 3,
        fractality: 0,
        upscale_prompt: "Add micro pores, micro hairs and sharp skin texture across all facial zones simultaneously. Full head must remain completely in frame."
      }
    }
  }
];
