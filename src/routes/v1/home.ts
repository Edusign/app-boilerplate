import Edusign from '@_edusign/api';
import { Request, Response } from 'express';

/**
 * Main route "/"
 * @param body | object
 */

export default async function homeRoute(req: Request, res: Response) {
  const blocksApi = new Edusign.Blocks();

  blocksApi.Title('title', 'Example App');
  blocksApi.Text('description', 'Intégration de ma nouvelle app avec Edusign.');

  return res.send(blocksApi.toJson());
}
