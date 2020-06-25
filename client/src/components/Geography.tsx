import React, { useState, memo } from 'react';
import { GeographyProps } from 'react-simple-maps';

// Had to edit the Geography Component from React-Simple-Maps to use React.forwardRef()
// This way it works with Material UI and Tooltip is Supported

const Geography = React.forwardRef(
  (props: GeographyProps, ref: React.ElementRef<any>) => {
    const {
      geography,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      onFocus,
      onBlur,
      style = {},
      className = '',
      ...restProps
    } = props;

    const [isPressed, setPressed] = useState(false);
    const [isFocused, setFocus] = useState(false);

    function handleMouseEnter(
      evt: React.MouseEvent<SVGPathElement, MouseEvent>
    ) {
      setFocus(true);
      if (onMouseEnter) onMouseEnter(evt);
    }

    function handleMouseLeave(
      evt: React.MouseEvent<SVGPathElement, MouseEvent>
    ) {
      setFocus(false);
      if (isPressed) setPressed(false);
      if (onMouseLeave) onMouseLeave(evt);
    }

    function handleFocus(evt: React.FocusEvent<SVGPathElement>) {
      setFocus(true);
      if (onFocus) onFocus(evt);
    }

    function handleBlur(evt: React.FocusEvent<SVGPathElement>) {
      setFocus(false);
      if (isPressed) setPressed(false);
      if (onBlur) onBlur(evt);
    }

    function handleMouseDown(
      evt: React.MouseEvent<SVGPathElement, MouseEvent>
    ) {
      setPressed(true);
      if (onMouseDown) onMouseDown(evt);
    }

    function handleMouseUp(evt: React.MouseEvent<SVGPathElement, MouseEvent>) {
      setPressed(false);
      if (onMouseUp) onMouseUp(evt);
    }

    return (
      <path
        ref={ref as any}
        tabIndex={Number('0')}
        className={`rsm-geography ${className}`}
        d={geography.svgPath}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={
          style[
            isPressed || isFocused
              ? isPressed
                ? 'pressed'
                : 'hover'
              : 'default'
          ]
        }
        {...restProps}
      />
    );
  }
);

Geography.displayName = 'Geography';
export default memo(Geography);
