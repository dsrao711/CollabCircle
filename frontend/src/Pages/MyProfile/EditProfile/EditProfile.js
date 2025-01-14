import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { Formik, Form , useFormik} from "formik";
import NavBar from "../../../components/Layout/NavBar/NavBar";
import Footer from "../../../components/Layout/Footer/Footer";
import BasicDetails from "../EditProfile/components/Basic.jsx";
import EduDetails from "../EditProfile/components/Education.jsx";
import ProDetails from "../EditProfile/components/Profession.jsx";
import validationSchema from "../../MyProfile/EditProfile/components/FormModal/ValidationSchema";
import InitialValues from "../../MyProfile/EditProfile/components/FormModal/InitialValues";
import FormModal from "../../MyProfile/EditProfile/components/FormModal/FormModal";
import useStyles from "../../MyProfile/EditProfile/styles";

const steps = ["Basic Details", "Educational Details", "Professional Details"];
const { formId, formField } = FormModal;

function renderStepContent(
  step,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  isValid
) {
  switch (step) {
    case 0:
      return (
        <BasicDetails
          formField={formField}
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
          isValid={isValid}
        />
       
      );
    case 1:
      return <EduDetails formField={formField} />;
    case 2:
      return <ProDetails formField={formField} />;
    default:
      return <div>Not Found</div>;
  }
}

export default function EditProfile() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  


  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
    
  }

  async function submitForm(values, actions) {
    
    await sleep(1000);
    // actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
    
  }

  async function handleSubmit(values, actions) {
    await sleep (1000) ;
    if (activeStep === steps.length - 1) {
      submitForm(values, actions);
      alert(JSON.stringify(values, null, 2));
      console.log(actions);
    } else {
      setActiveStep(activeStep + 1);
      
      // actions.setSubmitting(false);
    }
    
  }

  function handleNext() {
    setActiveStep(activeStep + 1);
  }

  function handleBack() {
    setActiveStep(activeStep - 1);

  }

  return (
    <div>
      <NavBar />
      <div>
        <React.Fragment>
          <CssBaseline />
          <Container fixed>
            <Typography
              component="div"
              style={{ backgroundColor: "#FEF7FF", height: "100vh" }}
            >
              <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  {activeStep === steps.length ? (
                    <div>
                      <h2>Thank you for you response</h2>
                    </div>
                  ) : (
                    <Formik
                      initialValues={InitialValues}
                      validationSchema={currentValidationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({
                        isSubmitting,
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        isValid,
                        
                    
                      }) => (
                        <Form id={formId}>
                          {renderStepContent(
                            activeStep,
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            isValid
                          )}

                          <div className={classes.buttons}>
                            {activeStep !== 0 && (
                              <Button
                                onClick={handleBack}
                                className={classes.button}
                              >
                                Back
                              </Button>
                            )}
                            <div className={classes.wrapper}>
                              <Button
                                disabled={isSubmitting}
                                type="submit"
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={handleSubmit}
                              >
                                {isLastStep ? "Confirm" : "Next"}
                              </Button>
                              {isSubmitting && (
                                <CircularProgress
                                  size={24}
                                  className={classes.buttonProgress}
                                />
                              )}
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )}
                </div>
              </div>
            </Typography>
          </Container>
        </React.Fragment>
      </div>
      <Footer />
    </div>
  );
}
