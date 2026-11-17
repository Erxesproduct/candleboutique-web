import Link from "next/link";
import { Flame } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="wrap py-28 text-center">
      <Flame size={40} className="mx-auto" />
      <h1 className="serif mt-6 text-5xl">Энэ хуудас унтарчээ</h1>
      <p className="mt-3 text-ink-2">Хайсан хуудас олдсонгүй. Дэлгүүрээс лаагаа сонгоорой.</p>
      <Link href="/shop" className="btn btn-ember mt-8">
        Дэлгүүр
      </Link>
    </div>
  );
}
