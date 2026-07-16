"use client";

import { createContext, type RefObject } from "react";

/**
 * When the site renders inside the 3D computer's screen, scrolling happens in
 * a nested container instead of the window. Components that track scroll
 * (e.g. the hero parallax) read this context to bind to the right scroller.
 * Null = normal flat page, window scrolling.
 */
export const ScrollContainerContext =
  createContext<RefObject<HTMLDivElement> | null>(null);
