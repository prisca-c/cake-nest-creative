import { DiscountType, initialDiscountState } from '@Types/DiscountType.ts';
import React, { useContext, useEffect, useState } from 'react';
import { AdminModeContext } from '@Context/AdminModeContext.ts';
import { useUpsertDiscountUseCase } from '~@/usecases/useUpsertDiscountUseCase.ts';
import { useDeleteDiscountUseCase } from '~@/usecases/useDeleteDiscountUseCase.ts';
import { DateTime } from 'luxon';

export const useDiscountForm = () => {
  const init = initialDiscountState;
  const [data, setData] = useState<DiscountType>(init);
  const { selectedDiscount, setSelectedDiscount } =
    useContext(AdminModeContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateDiscounts } = useUpsertDiscountUseCase();
  const { deleteDiscount } = useDeleteDiscountUseCase();

  useEffect(() => {
    if (data.endDate < data.startDate) {
      setData({ ...data, endDate: data.startDate });
    }
  }, [data]);

  useEffect(() => {
    if (selectedDiscount) {
      setData(selectedDiscount);
    }
  }, [selectedDiscount]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'cumulative' || name === 'enabled') {
      setData({ ...data, [name]: checked });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const startDateMin = DateTime.now().toFormat('yyyy-MM-dd');
  const endDateMin = DateTime.fromISO(data.startDate).toFormat('yyyy-MM-dd');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    await updateDiscounts(data)
      .then(() => {
        resetSelectedDiscount();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const label = selectedDiscount ? 'Modifier' : 'Ajouter';

  const resetSelectedDiscount = () => {
    setSelectedDiscount(null);
    setData(init);
    setIsLoading(false);
  };

  const removeDiscount = () => {
    if (isLoading) return;
    if (selectedDiscount) {
      setIsLoading(true);
      deleteDiscount(selectedDiscount.id)
        .then(() => {
          resetSelectedDiscount();
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    onChange,
    handleSubmit,
    label,
    resetSelectedDiscount,
    removeDiscount,
    startDateMin,
    endDateMin,
    selectedDiscount,
  };
};
