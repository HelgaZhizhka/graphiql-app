import logo from '@/assets/images/logo.svg';
import styles from './Logo.module.scss';

type Props = {
  title: string;
  className?: string;
};

const Logo: React.FC<Props> = ({ title, className }) => (
  <span className={`${styles.root} ${className}`}>
    <span className={styles.title}>{title}</span>
    <img className={styles.image} src={logo} alt={title} width="30" />
  </span>
);

export default Logo;
