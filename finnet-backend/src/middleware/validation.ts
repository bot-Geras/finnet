import type { Request, Response, NextFunction } from 'express';
import type { CreatePostInput } from '../types';

export const validateCreatePost = (req: Request, res: Response, next: NextFunction) => {
  const { title, body } = req.body;
  const errors: string[] = [];

  if (!title && title !== '') {
    errors.push('Title is required');
  }
  if (!body && body !== '') {
    errors.push('Body is required');
  }

  if (title !== undefined && title.trim() === '') {
    errors.push('Title cannot be empty');
  }
  if (body !== undefined && body.trim() === '') {
    errors.push('Body cannot be empty');
  }

  if (title && title.trim().length < 3) {
    errors.push('Title must be at least 3 characters');
  }
  if (body && body.trim().length < 10) {
    errors.push('Body must be at least 10 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors
    });
  }

  next();
};

export const validateUserId = (req: Request, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.userId as string);
  
  if (isNaN(userId) || userId <= 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid user ID. Must be a positive number.'
    });
  }

  req.params.userId = userId.toString();
  next();
};