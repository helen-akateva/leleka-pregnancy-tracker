import Link from "next/link";

export default function Breadcrumbs() {
  return (
    <div>
      <Link href={"/"}>Лелека</Link>
      <div>Стілочка</div>
      <div>Щоденник</div>
    </div>
  );
}
