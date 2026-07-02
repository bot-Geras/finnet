
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getUsers, getPostsByUserId, createPost } from '../api'
import type { User, Post, CreatePostInput, ApiResponse } from '../types'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response: ApiResponse<User[]> = await getUsers()
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch users')
      }
      return response.data
    },
  })
}

export function useUserPosts(userId: number | null) {
  return useQuery({
    queryKey: ['userPosts', userId],
    queryFn: async () => {
      if (!userId) return []
      const response = await getPostsByUserId(userId)
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch posts')
      }
      return { posts: response.data, user: response.user }
    },
    enabled: !!userId,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, post }: { userId: number; post: CreatePostInput }) => {
      const response = await createPost(userId, post)
      if (!response.success) {
        throw new Error(response.error || 'Failed to create post')
      }
      return response.data
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['userPosts', variables.userId] })
    },
  })
}

