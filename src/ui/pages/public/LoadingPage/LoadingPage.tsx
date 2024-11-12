import styles from "./styles.module.css";
type LoadingPageProps = {
  text?: string;
};
const LoadingPage: React.FC<LoadingPageProps> = ({ text }) => {
  return (
    <div className={styles.loadingPage}>
      <h1>{text ?? "Cargando..."}</h1>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingPage;
