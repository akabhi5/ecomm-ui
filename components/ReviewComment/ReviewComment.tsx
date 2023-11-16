"use client";

import React from "react";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  productSlug: string;
  newCommentSignal: () => void;
}

type Inputs = {
  comment: string;
};

const postReviews = async (productSlug: string, data: Inputs) => {
  const res = await fetch(`/api/reviews/${productSlug}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return res.ok;
};

const ReviewComment = ({ productSlug, newCommentSignal }: Props) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await postReviews(productSlug, data);
    if (res) {
      reset();
      newCommentSignal();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        id=""
        rows={10}
        className="border w-full rounded-md p-2"
        {...register("comment")}
      ></textarea>
      <div className="float-right">
        <Button type="submit">Comment</Button>
      </div>
    </form>
  );
};

export default ReviewComment;
