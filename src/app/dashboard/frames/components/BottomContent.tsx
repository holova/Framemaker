import React, { Dispatch, SetStateAction } from 'react';
import { Pagination, Select, SelectItem } from '@nextui-org/react';

type BottomContentProps = {
  total: number,
  perPage: number,
  setPerPage: Dispatch<SetStateAction<number>>
  page: number,
  setPage: Dispatch<SetStateAction<number>>
};

export default function BottomContent({
  page, setPage, total, perPage, setPerPage,
}: BottomContentProps) {
  return (
    <div className="flex items-center justify-between p-2">
      <span className="w-40 text-small text-default-400">
        Total
        {' '}
        {total}
        {' '}
        frames
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={Math.ceil(total / perPage)}
        onChange={setPage}
      />
      <div className="w-40 justify-end gap-2 sm:flex">
        <Select
          label="Rows per page:"
          labelPlacement="outside-left"
          size="sm"
          fullWidth={false}
          className="items-center whitespace-nowrap"
          selectedKeys={[perPage]}
          onChange={(e) => setPerPage(Number(e.target.value))}
        >
          <SelectItem key="10">10</SelectItem>
          <SelectItem key="25">25</SelectItem>
          <SelectItem key="50">50</SelectItem>
        </Select>
      </div>
    </div>
  );
}
