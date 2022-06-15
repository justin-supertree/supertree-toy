import React from 'react';
import Link from 'next/link';
import { breakpoints, palette, Button } from '@playdapp/ui';

import WriteLayout from '@/components/Layout/WriteLayout';
import WriteContent from '@/components/WriteContent';

const index = () => {
  return (
    <WriteLayout>
      <Link href={`/`}>
        <Button>Goback</Button>
      </Link>
    </WriteLayout>
  );
};

export default index;
