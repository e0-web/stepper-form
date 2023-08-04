import { BoxProps } from "@mui/material";
import React from "react";
export interface SteppedFormStepArgs<STATE> {
    state: STATE;
    inError: boolean;
    setState: React.Dispatch<React.SetStateAction<STATE>>;
    setStep: (step: number) => void;
    setError: (inError: boolean) => void;
    back: () => void;
    next: () => void;
}
export interface SteppedFormStep<STATE> {
    name: string;
    disableReturn?: boolean;
    enableJumpToStep?: boolean;
    overrideBackButton?: React.ReactNode;
    overrideNextButton?: React.ReactNode;
    element: (args: SteppedFormStepArgs<STATE>) => React.ReactNode;
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
 */
export interface SteppedFormProps<STATE> {
    defaultState: STATE;
    defaultStep?: number;
    steps: SteppedFormStep<STATE>[];
    onCancel?: () => void;
    onDone?: (state: STATE) => void;
    onStepChange?: (step: number, state: STATE) => void;
    stepperProps?: BoxProps;
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
export declare function StepperForm<STATE>(props: SteppedFormProps<STATE>): import("react/jsx-runtime").JSX.Element;
