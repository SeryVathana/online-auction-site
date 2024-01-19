import { PostType } from '@/lib/types';

const PostCard = ({ post }: { post: PostType }) => {
  return <div>{post.title}</div>;
};

export default PostCard;
