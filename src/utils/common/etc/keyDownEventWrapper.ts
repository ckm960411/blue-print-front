export const keyDownEventWrapper =
  (originalHandler: React.EventHandler<any>) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      originalHandler(e);
    }
  };
