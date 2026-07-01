import type { Request, Response } from 'express';
import * as postService from '../services/postService';
import * as userService from '../services/userService';

export const getPostsByUserId = (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    
    const user = userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const posts = postService.getPostsByUserId(userId);
    
    res.status(200).json({
      success: true,
      data: posts,
      count: posts.length,
      user: {
        id: user.id,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch posts'
    });
  }
};

export const createPost = (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId as string);
    const { title, body } = req.body;

    const user = userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const newPost = postService.createPost(userId, { title, body });

    res.status(201).json({
      success: true,
      data: newPost,
      message: 'Post created successfully'
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create post'
    });
  }
};