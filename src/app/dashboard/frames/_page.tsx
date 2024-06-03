'use client';

import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import Link from 'next/link';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link as LinkUI,
  User,
  Tooltip,
  Spinner,
  useDisclosure,
  Snippet,
} from '@nextui-org/react';

import {
  PencilIcon, TrashIcon, BugAntIcon, ShareIcon,
} from '@heroicons/react/24/outline';
import { LoadingState } from '@react-types/shared/src/collections';
import navigation from '@/app/lib/navigation';
import { useAuth } from '@/app/providers/auth';
import { GetFramesListUC } from '@/usecases';
import FrameApiRepository from '@/repositories/FrameApiRepository';
import ErrorModal from '@/app/dashboard/frames/components/ErrorModal';
import BottomContent from '@/app/dashboard/frames/components/BottomContent';
import TopContent from '@/app/dashboard/frames/components/TopContent';
import DeleteFrameUC from '@/usecases/DeleteFrameUC';
import DeleteModal from '@/app/dashboard/frames/components/DeleteModal';

const defaultColumns = [
  { name: 'NAME', uid: 'name' },
  { name: 'VERSION', uid: 'version' },
  { name: 'FRAME URL', uid: 'frameUrl' },
  { name: 'CREATED AT', uid: 'createdAt' },
  { name: 'ACTIONS', uid: 'actions' },
];

type CellProps = {
  frame: Frame
};

type ActionsCellProps = {
  onDelete(): Promise<void>;
} & CellProps;

function NameCell({ frame }: CellProps) {
  return (
    <User
      avatarProps={{ radius: 'lg', src: frame.image }}
      name={frame.name}
    />
  );
}

function FrameUrlCell({ frame }: CellProps) {
  return (
    <Snippet size="sm" symbol={null}><Link href={frame.publicURL} target="_blank">{frame.publicURL.toString()}</Link></Snippet>
  );
}

function CreatedAtCell({ frame }: CellProps) {
  return frame.createdAt?.toISOString();
}

function ActionsCell({ frame, onDelete: onDeleteP }: ActionsCellProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setLoading] = useState(false);

  const onDelete = useCallback(async () => {
    setLoading(true);
    await onDeleteP();
    setLoading(false);
  }, [onDeleteP]);

  return (
    <div className="relative flex items-center gap-2">
      <Tooltip content="Share frame">
        <LinkUI
          href={frame.warpcastShareURL.toString()}
          target="_blank"
          className="text-lg text-default-400 active:opacity-50"
        >
          <ShareIcon className="size-5" />
        </LinkUI>
      </Tooltip>
      <Tooltip content="Debug frame">
        <LinkUI
          href={frame.warpcastDevURL.toString()}
          target="_blank"
          className="text-lg text-default-400 active:opacity-50"
        >
          <BugAntIcon className="size-5" />
        </LinkUI>
      </Tooltip>
      <Tooltip content="Edit frame">
        <Link
          href={navigation.EDIT_FRAME.replace(':frame', frame.id || '')}
          className="text-lg text-default-400 active:opacity-50"
        >
          <PencilIcon className="size-5" />
        </Link>
      </Tooltip>
      <Tooltip color="danger" content="Delete frame">
        <LinkUI
          onClick={(e) => {
            e.preventDefault(); onOpen();
          }}
          className="cursor-pointer text-lg text-danger active:opacity-50"
        >
          <TrashIcon className="size-5" />
        </LinkUI>
      </Tooltip>
      <DeleteModal isOpen={isOpen} onClose={onClose} onDelete={onDelete} isLoading={isLoading} />
      <ErrorModal clearError={() => setError(null)}>{error}</ErrorModal>
    </div>
  );
}

export default function FramesTable() {
  const { token, profile } = useAuth();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [frames, setFrames] = useState<Frame[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [columns, setColumns] = useState(defaultColumns);

  useEffect(() => {
    if (profile?.role === 'admin') {
      setColumns([{ name: 'USER', uid: 'userId' }, ...defaultColumns]);
    }
  }, [profile]);

  const frameRepo = useMemo(() => new FrameApiRepository(token as string), [token]);

  const getFrames = useCallback(async () => {
    setLoadingState('loading');
    const presenter: GetFramesListOutPort = {
      present(out: GetFramesListOut): Promise<void> | void {
        setFrames(out.items);
        setTotal(out.count);
        setLoadingState('idle');
      },
    };
    new GetFramesListUC(frameRepo, presenter)
      .execute({ take: perPage, skip: perPage * (page - 1) })
      .catch((e: GetFramesListErrorPort) => {
        // eslint-disable-next-line no-console
        console.error(e);
        setError('Please try to refresh the page');
        setLoadingState('idle');
      });
  }, [frameRepo, perPage, page]);

  useEffect(() => {
    if (!token) {
      return;
    }

    getFrames().then(() => {});
  }, [getFrames, page, token]);

  const onDelete = useCallback(
    (frame: Frame) => async () => new Promise<void>((resolve) => {
      setLoadingState('loading');
      const presenter: DeleteFrameOutPort = {
        present(): Promise<void> | void {
          resolve();
          getFrames();
        },
      };

      new DeleteFrameUC(frameRepo, presenter).execute({ frame })
        .catch((e: DeleteFrameErrorPort) => {
          setError(e.payload.frame?.[0] || e.payload.server?.[0] || 'Something went wrong, try again.');
          setLoadingState('idle');
          resolve();
        });
    }),
    [frameRepo, getFrames],
  );

  const renderCell = useCallback((frame: Frame, columnKey: 'userId' | 'name' | 'version' | 'frameUrl' | 'createdAt' | 'actions') => {
    switch (columnKey) {
      case 'name':
        return <NameCell frame={frame} />;
      case 'frameUrl':
        return <FrameUrlCell frame={frame} />;
      case 'createdAt':
        return <CreatedAtCell frame={frame} />;
      case 'actions':
        return <ActionsCell frame={frame} onDelete={onDelete(frame)} />;
      default:
        return frame[columnKey];
    }
  }, [onDelete]);

  return (
    <>
      <Table
        aria-label="Frames list"
        topContent={<TopContent />}
        topContentPlacement="outside"
        bottomContent={(
          <BottomContent
            total={total}
            setPage={setPage}
            page={page}
            perPage={perPage}
            setPerPage={(v) => {
              setPerPage(v);
              setPage(1);
            }}
          />
        )}
        bottomContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={frames}
          loadingContent={<Spinner />}
          loadingState={loadingState}
          emptyContent="No rows to display."
        >
          {(frame: Frame) => (
            <TableRow key={frame.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(frame, columnKey as 'userId' | 'name' | 'version' | 'frameUrl' | 'createdAt' | 'actions')}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ErrorModal clearError={() => setError(null)}>{error}</ErrorModal>
    </>
  );
}
