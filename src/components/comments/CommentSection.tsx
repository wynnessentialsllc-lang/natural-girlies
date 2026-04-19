import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';

interface CommentSectionProps {
  articleId: string;
  title?: string;
}

export function CommentSection({ articleId, title = 'Join the Conversation' }: CommentSectionProps) {
  return (
    <section aria-label="Comments" className="mt-12 pt-10 border-t border-[#E8956A]/20">
      <h2 className="font-playfair text-2xl font-bold text-[#3C2415] mb-8">{title}</h2>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Form */}
        <div className="lg:col-span-2">
          <h3 className="text-base font-semibold text-[#3C2415] mb-4">Leave a Comment</h3>
          <CommentForm articleId={articleId} />
        </div>

        {/* List */}
        <div className="lg:col-span-3">
          <CommentList articleId={articleId} />
        </div>
      </div>
    </section>
  );
}
