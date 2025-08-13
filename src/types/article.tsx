export interface Article {
  id: string;
  title: string;
  createdAt: number;
  status: "draft" | "published" | "archived";
}
