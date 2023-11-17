"use client";

import React from "react";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  onSubmitComment: (comment: string) => Promise<boolean>;
  isSubmittingComment: boolean;
}

type Inputs = {
  comment: string;
};

const ReviewComment = ({ onSubmitComment, isSubmittingComment }: Props) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await onSubmitComment(data.comment);
    if (res) reset();
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
        <Button type="submit" disabled={isSubmittingComment}>
          Comment
        </Button>
      </div>
    </form>
  );
};

export default ReviewComment;
