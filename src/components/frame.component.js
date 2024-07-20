import { Button } from "@mui/material";
import InputField from "./inputField.component";
import PropTypes from "prop-types";
import styles from "../styles/frame.component.css";
import image2 from "../assets/image_2.png"

const FrameComponent = ({ className = "" }) => {
  return (
    <section className={[styles.frameParent, className].join(" ")}>
      <div className={styles.image1Wrapper}>
        <img
          className={styles.image1Icon}
          loading="lazy"
          alt=""
          src={image2}
        />
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.freeQuoteParent}>
          <h1 className={styles.freeQuote}>Log in to your account</h1>
          <div className={styles.supportingText}>
            Welcome back! Please enter your details.
          </div>
        </div>
        <form className={styles.content}>
          <div className={styles.form}>
            <InputField label="Email" contentPlaceholder="Enter your email" />
            <InputField
              label="Password"
              contentPlaceholder="••••••••"
              propMinWidth="66px"
            />
          </div>
          <div className={styles.row}>
            <div className={styles.checkbox}>
              <input className={styles.checkbox1} type="checkbox" />
              <div className={styles.filter}>Remember for 30 days</div>
            </div>
            <div className={styles.button}>
              <div className={styles.buttonBase}>
                <div className={styles.projectTitle}>Forgot password</div>
              </div>
            </div>
          </div>
          <div className={styles.buttonParent}>
            <Button
              className={styles.button1}
              disableElevation={true}
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: "16",
                background: "#1366d9",
                border: "#1366d9 solid 1px",
                borderRadius: "4px",
                "&:hover": { background: "#1366d9" },
                height: 44,
              }}
            >
              Sign in
            </Button>
            <Button
              className={styles.socialButtonGroups}
              startIcon={
                <img width="24px" height="24px" src="/social-icon.svg" />
              }
              disableElevation={true}
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#383e49",
                fontSize: "16",
                background: "#fff",
                border: "#d0d5dd solid 1px",
                borderRadius: "4px",
                "&:hover": { background: "#fff" },
                height: 44,
              }}
            >
              Sign in with Google
            </Button>
          </div>
        </form>
        <div className={styles.row1}>
          <div className={styles.viewProject}>Don’t have an account?</div>
          <div className={styles.button2}>
            <div className={styles.buttonBase1}>
              <div className={styles.loremIpsumDolor}>Sign up</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
