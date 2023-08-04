'use client';

import { Box, BoxProps, Button, ButtonProps, Step, StepButton, StepLabel, Stepper } from "@mui/material";
import React, { useCallback, useState } from "react";

export interface SteppedFormStepArgs<STATE> {
    state: STATE,
    inError: boolean,
    setState: React.Dispatch<React.SetStateAction<STATE>>,
    setStep: (step: number) => void,
    setError: (inError: boolean) => void,
    back: () => void,
    next: () => void,
}


/**
 * A step in a SteppedForm
 * @param name The name of the step
 * @param disableReturn OPTIONAL default: false
 * When true stops users from using the title as to come back to this step
 * @param enableJumpToStep 
 * * OPTIONAL default: false
 * * When true allows users to jump to this step from previous steps.
 * * *Note: users can always click title when this is the next step. to disable see `disabledNextByTitle`*
 * @param overrideBackButton OPTIONAL default: undefined
 * Overrides the back button with the given element
 * @param overrideNextButton OPTIONAL default: undefined
 * Overrides the next button with the given element
 * @param disabledNextByTitle OPTIONAL default: false
 * When true disables using the title as a next button when this step is next
 * @param element Function that returns the element to render for this step. see `SteppedFormStepArgs`
 * for the arguments available to this function
 */
export interface SteppedFormStep<STATE> {
    name: string;
    disableReturn?: boolean;
    enableJumpToStep?: boolean;
    overrideBackButton?: React.ReactNode;
    overrideNextButton?: React.ReactNode;
    disableNextByTitle?: boolean;
    element: (args: SteppedFormStepArgs<STATE>) => React.ReactNode;
}


interface NavButtonProps extends ButtonProps {
    currentStep: number,
    numSteps: number,
    setStep: (step: number) => void,
    onEndOfSteps: () => void,
    navButtonContent?: React.ReactNode,
    endStepButtonContent?: React.ReactNode,
}

function BackButton({ currentStep, numSteps, setStep, onEndOfSteps: cancel, navButtonContent, endStepButtonContent, onClick: _, ...props }: NavButtonProps) {

    navButtonContent = navButtonContent ?? <>Back</>;
    endStepButtonContent = endStepButtonContent ?? <>Cancel</>;

    if (currentStep > 0) {
        return (
            <>
                <Button {...props} onClick={() => setStep(currentStep - 1)}>{navButtonContent}</Button>
            </>
        )


    }
    return (
        <>
            <Button {...props} onClick={cancel}>{endStepButtonContent}</Button>
        </>
    )
}

function NextButton({ currentStep, numSteps, setStep: setTab, onEndOfSteps: complete, navButtonContent, endStepButtonContent, onClick: _, ...props }: NavButtonProps) {

    navButtonContent = navButtonContent ?? <>Next</>;
    endStepButtonContent = endStepButtonContent ?? <>Finish</>;

    if (currentStep < numSteps - 1) {
        return (
            <>
                <Button {...props} onClick={() => setTab(currentStep + 1)}>{navButtonContent}</Button>
            </>
        )


    }
    return (
        <>
            <Button {...props} color="secondary" onClick={complete}>{endStepButtonContent}</Button>
        </>
    )
}

/**
 * Props for SteppedForm
 * @param defaultState 
 * The default state for the form.
 * This will be passed out in the onDone callback
 * @param defaultStep 
 * OPTIONAL default: 0
 * 
 * The default step to start on  
 * @param steps The steps to render
 * @param onCancel Callback for when the user cancels the form
 * @param onDone Callback for when the user completes the form
 * @param onStepChange Callback for when the user changes the step
 * @param stepperProps Props for the box containing the stepper
 * @param contentBoxProps Props for the content box
 * @param buttonAreaProps Props for the button area
 * @param backButtonContent Content for the back button
 * @param nextButtonContent Content for the next button
 * @param cancelButtonContent Content for the cancel button
 * @param completeButtonContent Content for the complete button
 */
export interface SteppedFormProps<STATE> {
    defaultState: STATE;
    defaultStep?: number,
    steps: SteppedFormStep<STATE>[];
    onCancel?: () => void;
    onDone?: (state: STATE) => void;
    onStepChange?: (step: number, state: STATE) => void;
    stepperProps?: BoxProps
    contentBoxProps?: BoxProps;
    buttonAreaProps?: BoxProps;
    backButtonContent?: React.ReactNode;
    nextButtonContent?: React.ReactNode;
    cancelButtonContent?: React.ReactNode;
    completeButtonContent?: React.ReactNode;
}


/**
 * A form that is split into multiple steps
 * @param props see SteppedFormProps
 */
export function StepperForm<STATE>(props: SteppedFormProps<STATE>) {

    let {
        defaultState,
        defaultStep,
        steps,
        onCancel,
        onDone,
        onStepChange,
        stepperProps,
        contentBoxProps,
        buttonAreaProps,
        backButtonContent,
        nextButtonContent,
        cancelButtonContent,
        completeButtonContent
    } = props;

    if (steps.length == 0) {
        throw new Error("StagedForm must have at least one step");
    }
    defaultStep = defaultStep ?? 0;

    let [state, setState] = useState(defaultState);
    let [currentStep, setStep] = useState(defaultStep);
    let [stepsInError, setStepsInError] = useState<number[]>([]);

    let setStepInternal = useCallback((step: number) => {
        step = Math.max(0, Math.min(step, steps.length - 1));
        setStep(step);
        onStepChange?.(step, state);
    }, [setStep, onStepChange, state]);

    let onCancelInternal = useCallback(() => {
        onCancel?.();
    }, [onCancel]);

    let onDoneInternal = useCallback(() => {
        onDone?.(state);
    }, [onDone, state]);

    let stepLabel = (name: string, i: number) => {
        return (<StepLabel
            error={stepsInError.includes(i)}
            color="inherit">
            {name}
        </StepLabel>)
    };

    let stepButton = (name: string, i: number) => {
        return (<StepButton
            color="inherit"
            onClick={() => setStepInternal(i)}>
            {name}
        </StepButton>)
    };

    let stepComponents = useCallback(() => steps.map(
        (step, i) =>
        (
            <Step key={step.name} completed={i < currentStep} >
                {
                    (steps[i].disableReturn && i < currentStep)
                        || i == currentStep
                        || steps[i].disableNextByTitle
                        || (stepsInError.length > 0 && stepsInError.sort().reverse()[0] <= i) ? stepLabel(step.name, i)
                    || !(steps[i].enableJumpToStep || i < currentStep || i == currentStep + 1)
                        :
                        stepButton(step.name, i)
                }
            </Step>
        )
    ), [steps, currentStep, stepsInError, setStepInternal]);

    let stepperPadding = stepperProps?.padding ?? "15px";
    let contentPadding = contentBoxProps?.padding ?? "15px";



    return (
        <>

            <Box display={"flex"} flexDirection={"column"} width="100%">
                <Box padding={stepperPadding} {...stepperProps}>
                    <Stepper nonLinear activeStep={currentStep}>
                        {stepComponents()}
                    </Stepper>
                </Box>
                <Box display={"flex"} flexDirection={"column"} flex={1} padding={contentPadding} {...contentBoxProps}>

                    <Box justifyContent='space-around' {...contentBoxProps}>
                        {steps[currentStep].element({
                            state,
                            inError: stepsInError.includes(currentStep),
                            setState,
                            setStep: setStepInternal,
                            back: () => setStepInternal(currentStep - 1),
                            next: () => setStepInternal(currentStep + 1),
                            setError: (error: boolean) => {
                                if (error) {
                                    setStepsInError([...stepsInError, currentStep]);
                                } else {
                                    setStepsInError(stepsInError.filter((step) => step != currentStep));
                                }
                            }
                        })}
                    </Box>

                    <Box display={"flex"} flex={1} alignItems={"flex-end"}  {...buttonAreaProps}>
                        <Box flex={1} display={"flex"}>
                            {steps[currentStep].overrideBackButton ?? (
                                <BackButton
                                    currentStep={currentStep}
                                    numSteps={steps.length}
                                    setStep={setStepInternal}
                                    onEndOfSteps={onCancelInternal}
                                    navButtonContent={backButtonContent}
                                    endStepButtonContent={cancelButtonContent}
                                    disabled={stepsInError.includes(currentStep)} />
                            )}
                        </Box>
                        <Box flex={1} display={"flex"} justifyContent={"flex-end"}>
                            {steps[currentStep].overrideNextButton ?? (
                                <NextButton
                                    currentStep={currentStep}
                                    numSteps={steps.length}
                                    setStep={setStepInternal}
                                    onEndOfSteps={onDoneInternal}
                                    navButtonContent={nextButtonContent}
                                    endStepButtonContent={completeButtonContent}
                                    disabled={stepsInError.includes(currentStep)} />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box >
        </>
    )
}