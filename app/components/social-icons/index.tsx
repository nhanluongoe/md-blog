import { Facebook, Github, Linkedin, Mail, Twitter, Youtube } from './icons';

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
};

type SocialIconProps = {
  kind: keyof typeof components;
  href: string | undefined;
  size?: number;
};

const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (
    !href ||
    (kind === 'mail' &&
      !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
  )
    return null;

  const SocialSvg = components[kind];

  return (
    <a
      className="text-sm text-gray-900 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-accent-400 transition-colors`}
        style={{ width: size * 4, height: size * 4 }}
      />
    </a>
  );
};

export default SocialIcon;
