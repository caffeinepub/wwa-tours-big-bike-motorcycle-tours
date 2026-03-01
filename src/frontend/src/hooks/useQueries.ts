import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InquiryInput, Testimonial, Tour } from "../backend.d";
import { useActor } from "./useActor";

export function useGetTours() {
  const { actor, isFetching } = useActor();
  return useQuery<Tour[]>({
    queryKey: ["tours"],
    queryFn: async () => {
      if (!actor) return [];
      const tours = await actor.getTours();
      return tours.filter((t) => t.isActive);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFeaturedTours() {
  const { actor, isFetching } = useActor();
  return useQuery<Tour[]>({
    queryKey: ["featured-tours"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedTours();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTour(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Tour>({
    queryKey: ["tour", id],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getTour(BigInt(id));
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useGetTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: InquiryInput) => {
      if (!actor) throw new Error("No actor");
      await actor.submitInquiry(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}
