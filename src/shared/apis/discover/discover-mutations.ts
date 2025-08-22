import { useMutation } from '@tanstack/react-query';
import { api } from '../factory';
import type { AiRecommendRequest, AiRecommendResponse } from './discover';
export const useAiRecommendMutation = () =>
  useMutation<AiRecommendResponse, unknown, AiRecommendRequest>({
    mutationFn: (body) => api.discover.aiRecommend(body),
  });
