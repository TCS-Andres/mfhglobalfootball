// Insights blog posts: slug and hero image per post key (mirrored across all locales).
export const posts = [
  { key: 'p1', slug: 'work-permits-and-quotas-explained', img: '/photos/blog-p1.jpg' },
  { key: 'p2', slug: 'signing-pro-at-16-and-college', img: '/photos/blog-p2.jpg' },
  { key: 'p3', slug: 'environment-shapes-development', img: '/photos/blog-p3.jpg' },
  { key: 'p4', slug: 'late-bloomers-and-relative-age', img: '/photos/blog-p4.jpg' },
] as const;

export type PostKey = (typeof posts)[number]['key'];
