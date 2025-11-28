import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getBlogPosts, getBlogPost, formatDate } from './utils';
import fs from 'fs';
import path from 'path';

vi.mock('fs', () => ({
    default: {
        readdirSync: vi.fn(),
        readFileSync: vi.fn(),
    },
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
}));

describe('blog utils', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    describe('formatDate', () => {
        it('formats date correctly', () => {
            const date = '2023-01-01';
            const formatted = formatDate(date);
            expect(formatted).toBe('January 2023');
        });

        it('formats date with relative time', () => {
            // Mock current date to ensure consistent relative time
            const mockDate = new Date('2023-01-02');
            vi.useFakeTimers();
            vi.setSystemTime(mockDate);

            const date = '2023-01-01';
            const formatted = formatDate(date, true);
            expect(formatted).toBe('January 2023 (1d ago)');

            vi.useRealTimers();
        });
    });

    describe('getBlogPosts', () => {
        it('returns metadata for all posts', () => {
            const mockFiles = ['post1.mdx', 'post2.mdx'];
            const mockContent1 = `---
title: Post 1
publishedAt: 2023-01-01
summary: Summary 1
draft: false
---
Content 1`;
            const mockContent2 = `---
title: Post 2
publishedAt: 2023-01-02
summary: Summary 2
draft: false
---
Content 2`;

            (fs.readdirSync as any).mockReturnValue(mockFiles);
            (fs.readFileSync as any).mockImplementation((path: string) => {
                if (path.includes('post1.mdx')) return mockContent1;
                if (path.includes('post2.mdx')) return mockContent2;
                return '';
            });

            const posts = getBlogPosts();

            expect(posts).toHaveLength(2);
            expect(posts[0]).toEqual({
                metadata: {
                    title: 'Post 1',
                    publishedAt: '2023-01-01',
                    summary: 'Summary 1',
                    draft: 'false',
                },
                slug: 'post1',
            });
            expect(posts[1]).toEqual({
                metadata: {
                    title: 'Post 2',
                    publishedAt: '2023-01-02',
                    summary: 'Summary 2',
                    draft: 'false',
                },
                slug: 'post2',
            });
        });

        it('filters out draft posts', () => {
            const mockFiles = ['published.mdx', 'draft.mdx', 'no-draft.mdx'];
            const publishedContent = `---
title: Published Post
publishedAt: 2023-01-01
summary: Summary
draft: false
---
Content`;
            const draftContent = `---
title: Draft Post
publishedAt: 2023-01-02
summary: Summary
draft: true
---
Content`;
            const noDraftContent = `---
title: No Draft Post
publishedAt: 2023-01-03
summary: Summary
---
Content`;

            (fs.readdirSync as any).mockReturnValue(mockFiles);
            (fs.readFileSync as any).mockImplementation((path: string) => {
                if (path.includes('published.mdx')) return publishedContent;
                if (path.includes('draft.mdx')) return draftContent;
                if (path.includes('no-draft.mdx')) return noDraftContent;
                return '';
            });

            const posts = getBlogPosts();

            expect(posts).toHaveLength(1);
            expect(posts[0].metadata.title).toBe('Published Post');
        });
    });

    describe('getBlogPost', () => {
        it('returns post with content when found', () => {
            const mockFiles = ['post1.mdx'];
            const mockContent = `---
title: Post 1
publishedAt: 2023-01-01
summary: Summary 1
draft: false
---
Content 1`;

            (fs.readdirSync as any).mockReturnValue(mockFiles);
            (fs.readFileSync as any).mockReturnValue(mockContent);

            const post = getBlogPost('post1');

            expect(post).toBeDefined();
            expect(post?.content).toBe('Content 1');
            expect(post?.metadata.title).toBe('Post 1');
        });

        it('returns undefined when post not found', () => {
            (fs.readdirSync as any).mockReturnValue(['post1.mdx']);
            (fs.readFileSync as any).mockReturnValue(`---
title: Post 1
---
Content`);

            const post = getBlogPost('non-existent');

            expect(post).toBeUndefined();
        });
    });
});
