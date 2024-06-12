import React, { useRef, useState, useEffect } from "react";
import { Box, Flex, IconButton, VStack } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const colors = ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"];
const brushSizes = [5, 10, 15, 20, 25];

const Index = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(colors[0]);
  const [brushSize, setBrushSize] = useState(brushSizes[2]);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    setCtx(context);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.stroke();
  };

  const stopDrawing = () => {
    ctx.closePath();
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
        left="50%"
        transform="translateX(-50%)"
        bg="rgba(255, 255, 255, 0.8)"
        p={4}
        borderRadius="md"
        boxShadow="md"
        zIndex={10}
      >
        <VStack spacing={4}>
          <Flex>
            {colors.map((c) => (
              <IconButton
                key={c}
                aria-label={c}
                icon={<FaCircle color={c} />}
                size="lg"
                isRound
                onClick={() => setColor(c)}
                border={color === c ? "2px solid black" : "none"}
              />
            ))}
          </Flex>
          <Flex>
            {brushSizes.map((size) => (
              <IconButton
                key={size}
                aria-label={`${size}px`}
                icon={<FaCircle size={size} />}
                size="lg"
                isRound
                onClick={() => setBrushSize(size)}
                border={brushSize === size ? "2px solid black" : "none"}
              />
            ))}
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Index;