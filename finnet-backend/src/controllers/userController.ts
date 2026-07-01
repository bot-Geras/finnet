import type { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getUsers = (req: Request, res: Response) => {
  try {
    const users = userService.getAllUsers();
    
    if (users.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        count: 0,
        message: 'No users found'
      });
    }

    res.status(200).json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
};

export const getUserById = (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    const user = userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user'
    });
  }
};