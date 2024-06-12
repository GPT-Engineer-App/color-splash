import React, { useRef, useState, useEffect } from "react";
import { Box, Flex, IconButton, VStack, HStack } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const colors = ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"];
const brushSizes = [5, 10, 15, 20, 25];

const Index = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(colors[0]);
  const [brushSize, setBrushSize] = useState(brushSizes[1]);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    setContext(ctx);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    context.stroke();
  };

  const stopDrawing = () => {
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <Box position="relative" width="100vw" height="100vh">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ display: "block" }}
      />
      <Flex
        position="absolute"
        bottom={4}
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <HStack spacing={4}>
          {colors.map((c) => (
            <IconButton
              key={c}
              aria-label={`Select ${c}`}
              icon={<FaCircle color={c} />}
              onClick={() => setColor(c)}
              border={color === c ? "2px solid black" : "none"}
            />
          ))}
        </HStack>
        <HStack spacing={4} ml={8}>
          {brushSizes.map((size) => (
            <IconButton
              key={size}
              aria-label={`Select brush size ${size}`}
              icon={<Box as="span" width={`${size}px`} height={`${size}px`} borderRadius="50%" bg="black" />}
              onClick={() => setBrushSize(size)}
              border={brushSize === size ? "2px solid black" : "none"}
            />
          ))}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Index;