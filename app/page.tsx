import { BlogPosts } from 'app/components/posts';
import siteMetaData from './siteMetadata';

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Thoughts and Shares
      </h1>
      <p className="mb-4">{siteMetaData.about}</p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
