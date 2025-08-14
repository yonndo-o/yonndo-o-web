import "@/styles/components/articlelist/articlelist.css";

export default function ArticleSkeleton() {
  return (
    <li className="card skeleton">
      <div className="imageWrapper">
        <div className="image loading" />
      </div>
      <div className="text">
        <h3 className="loading title" />
        <p className="loading excerpt" />
        <span className="loading date" />
      </div>
    </li>
  );
}
