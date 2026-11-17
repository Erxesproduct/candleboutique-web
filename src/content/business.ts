/**
 * Business facts from candleboutique.mn (Zochil shop 4152: shop settings, checkout, delivery, «About» and FAQ pages)
 * and the Facebook page «Candle_Boutique.mn», read on 2026-11-17. Nothing here is invented; open questions are
 * listed in docs/erxes/MANUAL-STEPS.md.
 */
export const business = {
  name: "Candle Boutique",
  tagline: "Хайраар урласан лаа",
  description: "Гар аргаар урласан тансаг зэрэглэлийн лаанууд нэг дор. Шар буурцагны тос, цэвэр хөвөн гол, анхилуун үнэр: Улаанбаатарт 2020 оноос.",
  since: 2020,
  phone: { display: "9999-8290", tel: "+97699998290" },
  email: "Candleboutique.mn@gmail.com",
  /** The pop-up corner inside the Golden Pen stationery shop (the address on Zochil). */
  store: {
    name: "POP-UP STORE",
    address: "Central Tower, 2 давхар, Golden Pen Stationery дэлгүүр дотор",
    phone: { display: "7011-8866", tel: "+97670118866" },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Central Tower, Ulaanbaatar"),
  },
  facebook: "https://www.facebook.com/candleboutique.mn",
  instagram: "https://www.instagram.com/candle_boutique.mn/",
  payments: [{ id: "qpay", name: "QPay", note: "Аль ч банкны аппаар QR уншуулж төлнө" }],
  /**
   * Zochil has one delivery option: «Улаанбаатар», 5,000₮, no free-delivery limit. The delivery rule also accepts
   * countryside orders, with the extra cost and risk on the buyer.
   */
  delivery: [
    { id: "city", name: "Улаанбаатар хот", fee: 5000, note: "Захиалга баталгаажсанаас хойш 24 цагийн дотор" },
    { id: "countryside", name: "Орон нутаг", fee: 5000, note: "Нэмэлт зардал, эрсдэлийг худалдан авагч хариуцна" },
  ],
  rules: {
    payment: "Төлбөрөө 100% урьдчилан төлснөөр таны захиалга баталгаажна. Төлбөр дутуу бол хүргэлт хийгдэхгүй.",
    delivery: "Захиалга баталгаажсанаас хойш 24 цагийн дотор хүргэнэ. Улаанбаатар хотод хүргэлт 5,000₮.",
    countryside: "Орон нутаг руу хүргүүлэх бол хаяг, унааны мэдээллээ дэлгэрэнгүй бичнэ үү. Гарах зардал болон эрсдэлийг худалдан авагч тал хариуцна.",
    terms: "Хүргэлтийн төлбөрийг хэрэглэгч өөрөө хариуцна.",
    ebarimt: "Бүх захиалгад и-баримт олгоно. Байгууллагаар авах бол 7 оронтой регистрийн дугаараа бичнэ үү.",
  },
} as const;

export type DeliveryId = (typeof business.delivery)[number]["id"];
export const deliveryOption = (id: DeliveryId) => business.delivery.find((d) => d.id === id)!;

/** Delivery fee: 5,000₮ (no free-delivery threshold on Zochil). */
export const deliveryFee = (id: DeliveryId) => deliveryOption(id).fee;
