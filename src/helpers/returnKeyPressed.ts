const returnKeyPressed = (e?: { key?: string; keyCode?: number }): boolean => e?.key === 'Enter' || e?.keyCode === 13;

export default returnKeyPressed;
