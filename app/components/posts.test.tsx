import { render, screen, cleanup } from '@testing-library/react';
import { BlogPosts } from './posts';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as utils from 'app/blog/utils';

// Mock the utils module
vi.mock('app/blog/utils', () => ({
    getBlogPosts: vi.fn(),
    formatDate: (date: string) => date,
}));

describe('BlogPosts', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    afterEach(() => {
        cleanup();
    });

    it('renders a list of blog posts', () => {
        const mockPosts = [
            {
                slug: 'post-1',
                metadata: {
                    title: 'Post 1',
                    publishedAt: '2023-01-01',
                    summary: 'Summary 1',
                },
            },
            {
                slug: 'post-2',
                metadata: {
                    title: 'Post 2',
                    publishedAt: '2023-01-02',
                    summary: 'Summary 2',
                },
            },
        ];

        vi.mocked(utils.getBlogPosts).mockReturnValue(mockPosts);

        render(<BlogPosts />);

        expect(screen.getByText('Post 1')).toBeDefined();
        expect(screen.getByText('Post 2')).toBeDefined();
        expect(screen.getByText('2023-01-01')).toBeDefined();
    });

    it('renders nothing when no posts', () => {
        vi.mocked(utils.getBlogPosts).mockReturnValue([]);

        render(<BlogPosts />);

        const links = screen.queryAllByRole('link');
        expect(links).toHaveLength(0);
    });
});
