'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, Step, StepButton, StepLabel, Stepper } from "@mui/material";
import { useCallback, useState } from "react";
function BackButton(_a) {
    var currentStep = _a.currentStep, numSteps = _a.numSteps, setStep = _a.setStep, cancel = _a.onEndOfSteps, navButtonContent = _a.navButtonContent, endStepButtonContent = _a.endStepButtonContent, _ = _a.onClick, props = __rest(_a, ["currentStep", "numSteps", "setStep", "onEndOfSteps", "navButtonContent", "endStepButtonContent", "onClick"]);
    navButtonContent = navButtonContent !== null && navButtonContent !== void 0 ? navButtonContent : _jsx(_Fragment, { children: "Back" }, void 0);
    endStepButtonContent = endStepButtonContent !== null && endStepButtonContent !== void 0 ? endStepButtonContent : _jsx(_Fragment, { children: "Cancel" }, void 0);
    if (currentStep > 0) {
        return (_jsx(_Fragment, { children: _jsx(Button, __assign({}, props, { onClick: function () { return setStep(currentStep - 1); } }, { children: navButtonContent }), void 0) }, void 0));
    }
    return (_jsx(_Fragment, { children: _jsx(Button, __assign({}, props, { onClick: cancel }, { children: endStepButtonContent }), void 0) }, void 0));
}
function NextButton(_a) {
    var currentStep = _a.currentStep, numSteps = _a.numSteps, setTab = _a.setStep, complete = _a.onEndOfSteps, navButtonContent = _a.navButtonContent, endStepButtonContent = _a.endStepButtonContent, _ = _a.onClick, props = __rest(_a, ["currentStep", "numSteps", "setStep", "onEndOfSteps", "navButtonContent", "endStepButtonContent", "onClick"]);
    navButtonContent = navButtonContent !== null && navButtonContent !== void 0 ? navButtonContent : _jsx(_Fragment, { children: "Next" }, void 0);
    endStepButtonContent = endStepButtonContent !== null && endStepButtonContent !== void 0 ? endStepButtonContent : _jsx(_Fragment, { children: "Finish" }, void 0);
    if (currentStep < numSteps - 1) {
        return (_jsx(_Fragment, { children: _jsx(Button, __assign({}, props, { onClick: function () { return setTab(currentStep + 1); } }, { children: navButtonContent }), void 0) }, void 0));
    }
    return (_jsx(_Fragment, { children: _jsx(Button, __assign({}, props, { color: "secondary", onClick: complete }, { children: endStepButtonContent }), void 0) }, void 0));
}
/**
 * A form that is split into multiple steps
 * @param props see SteppedFormProps
 */
export function StepperForm(props) {
    var _a, _b, _c, _d;
    var defaultState = props.defaultState, defaultStep = props.defaultStep, steps = props.steps, onCancel = props.onCancel, onDone = props.onDone, onStepChange = props.onStepChange, stepperProps = props.stepperProps, contentBoxProps = props.contentBoxProps, buttonAreaProps = props.buttonAreaProps, backButtonContent = props.backButtonContent, nextButtonContent = props.nextButtonContent, cancelButtonContent = props.cancelButtonContent, completeButtonContent = props.completeButtonContent;
    if (steps.length == 0) {
        throw new Error("StagedForm must have at least one step");
    }
    defaultStep = defaultStep !== null && defaultStep !== void 0 ? defaultStep : 0;
    var _e = useState(defaultState), state = _e[0], setState = _e[1];
    var _f = useState(defaultStep), currentStep = _f[0], setStep = _f[1];
    var _g = useState([]), stepsInError = _g[0], setStepsInError = _g[1];
    var setStepInternal = useCallback(function (step) {
        step = Math.max(0, Math.min(step, steps.length - 1));
        setStep(step);
        onStepChange === null || onStepChange === void 0 ? void 0 : onStepChange(step, state);
    }, [setStep, onStepChange, state]);
    var onCancelInternal = useCallback(function () {
        onCancel === null || onCancel === void 0 ? void 0 : onCancel();
    }, [onCancel]);
    var onDoneInternal = useCallback(function () {
        onDone === null || onDone === void 0 ? void 0 : onDone(state);
    }, [onDone, state]);
    var stepLabel = function (name, i) {
        return (_jsx(StepLabel, __assign({ error: stepsInError.includes(i), color: "inherit" }, { children: name }), void 0));
    };
    var stepButton = function (name, i) {
        return (_jsx(StepButton, __assign({ color: "inherit", onClick: function () { return setStepInternal(i); } }, { children: name }), void 0));
    };
    var stepComponents = useCallback(function () { return steps.map(function (step, i) {
        return (_jsx(Step, __assign({ completed: i < currentStep }, { children: steps[i].disableReturn && i < currentStep || i == currentStep ? stepLabel(step.name, i) :
                (stepsInError.length > 0 && stepsInError.sort().reverse()[0] <= i ? stepLabel(step.name, i) :
                    (steps[i].enableJumpToStep || i < currentStep || i == currentStep + 1 ? stepButton(step.name, i) : stepLabel(step.name, i))) }), step.name));
    }); }, [steps, currentStep, stepsInError, setStepInternal]);
    var stepperPadding = (_a = stepperProps === null || stepperProps === void 0 ? void 0 : stepperProps.padding) !== null && _a !== void 0 ? _a : "15px";
    var contentPadding = (_b = contentBoxProps === null || contentBoxProps === void 0 ? void 0 : contentBoxProps.padding) !== null && _b !== void 0 ? _b : "15px";
    return (_jsx(_Fragment, { children: _jsxs(Box, __assign({ display: "flex", flexDirection: "column", width: "100%" }, { children: [_jsx(Box, __assign({ padding: stepperPadding }, stepperProps, { children: _jsx(Stepper, __assign({ nonLinear: true, activeStep: currentStep }, { children: stepComponents() }), void 0) }), void 0), _jsxs(Box, __assign({ display: "flex", flexDirection: "column", flex: 1, padding: contentPadding }, contentBoxProps, { children: [_jsx(Box, __assign({ justifyContent: 'space-around' }, contentBoxProps, { children: steps[currentStep].element({
                                state: state,
                                inError: stepsInError.includes(currentStep),
                                setState: setState,
                                setStep: setStepInternal,
                                back: function () { return setStepInternal(currentStep - 1); },
                                next: function () { return setStepInternal(currentStep + 1); },
                                setError: function (error) {
                                    if (error) {
                                        setStepsInError(__spreadArray(__spreadArray([], stepsInError, true), [currentStep], false));
                                    }
                                    else {
                                        setStepsInError(stepsInError.filter(function (step) { return step != currentStep; }));
                                    }
                                }
                            }) }), void 0), _jsxs(Box, __assign({ display: "flex", flex: 1, alignItems: "flex-end" }, buttonAreaProps, { children: [_jsx(Box, __assign({ flex: 1, display: "flex" }, { children: (_c = steps[currentStep].overrideBackButton) !== null && _c !== void 0 ? _c : (_jsx(BackButton, { currentStep: currentStep, numSteps: steps.length, setStep: setStepInternal, onEndOfSteps: onCancelInternal, navButtonContent: backButtonContent, endStepButtonContent: cancelButtonContent, disabled: stepsInError.includes(currentStep) }, void 0)) }), void 0), _jsx(Box, __assign({ flex: 1, display: "flex", justifyContent: "flex-end" }, { children: (_d = steps[currentStep].overrideNextButton) !== null && _d !== void 0 ? _d : (_jsx(NextButton, { currentStep: currentStep, numSteps: steps.length, setStep: setStepInternal, onEndOfSteps: onDoneInternal, navButtonContent: nextButtonContent, endStepButtonContent: completeButtonContent, disabled: stepsInError.includes(currentStep) }, void 0)) }), void 0)] }), void 0)] }), void 0)] }), void 0) }, void 0));
}
