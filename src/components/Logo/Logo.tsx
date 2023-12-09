import logo from '@/assets/images/logo.svg';
import styles from './Logo.module.scss';

type Props = {
  title: string;
  className?: string;
};

const Logo: React.FC<Props> = ({ title, className }) => (
  <div className={`${styles.root} ${className}`}>
    <img className={styles.image} src={logo} alt={title} width="30" />
    <h1 className={styles.title}>{title}</h1>
  </div>
);

export default Logo;
