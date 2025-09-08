import siteMetaData from 'app/siteMetadata';
import SocialIcon from './social-icons';

interface FooterItem {
  name: string;
  icon: 'github' | 'linkedin';
  href: string;
}

const footerItems: FooterItem[] = [
  {
    name: 'github',
    icon: 'github',
    href: siteMetaData.github,
  },
  {
    name: 'linkedin',
    icon: 'linkedin',
    href: siteMetaData.linkedin,
  },
];

export default function Footer() {
  return (
    <footer className="mb-8">
      <div className="my-2 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          {footerItems.map((item) => (
            <SocialIcon
              key={item.name}
              kind={item.icon}
              size={6}
              href={item.href}
            />
          ))}
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-900 dark:text-gray-100">
          <div>{siteMetaData.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  );
}
