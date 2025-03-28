/**
 * Exports route handlers for the application.
 *
 * @module Routes
 * @description
 * This module serves as the entry point for all route handlers in the application.
 * It exports the following:
 * - `v1`: Handles version 1 of the API routes.
 * - `webhook`: Handles webhook-related routes.
 */
export { default as v1 } from './v1';
export { default as webhook } from './webhook';
