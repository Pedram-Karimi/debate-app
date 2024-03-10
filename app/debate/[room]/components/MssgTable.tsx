export default function MssgTable({
  id,
  mssg,
  writerId,
  replyId,
  createdAt,
}: {
  id: string;
  mssg: string;
  writerId: string;
  replyId: string;
  createdAt: Date;
}) {
  return <div>{mssg}</div>;
}
