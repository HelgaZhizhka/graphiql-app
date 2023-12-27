import logo from '@/assets/images/logo.svg';
import styles from './Logo.module.scss';

type Props = {
  title: string;
};

const Logo: React.FC<Props> = ({ title }) => (
  <span className={styles.root}>
    <span className={styles.title}>{title}</span>
    <img className={styles.image} src={logo} alt={title} width="30" />
  </span>
);

export default Logo;
