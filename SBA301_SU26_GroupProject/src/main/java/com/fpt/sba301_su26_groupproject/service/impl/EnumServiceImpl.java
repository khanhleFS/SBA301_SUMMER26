package com.fpt.sba301_su26_groupproject.service.impl;

import com.fpt.sba301_su26_groupproject.dto.enumeration.EnumResponseDTO;
import com.fpt.sba301_su26_groupproject.service.EnumService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.core.type.filter.AssignableTypeFilter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EnumServiceImpl implements EnumService {

    private static final String ENUM_PACKAGE =
            "com.fpt.sba301_su26_groupproject.entity.Enumeration";

    @Override
    public List<EnumResponseDTO> getAllEnums() {
        List<EnumResponseDTO> enums = new ArrayList<>();

        try {
            List<Class<? extends Enum<?>>> enumClasses = scanEnumClasses();

            for (Class<? extends Enum<?>> enumClass : enumClasses) {
                enums.add(
                        new EnumResponseDTO(
                                enumClass.getSimpleName(),
                                getEnumValues(enumClass)
                        )
                );
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to scan enum classes", e);
        }

        return enums;
    }

    @SuppressWarnings("unchecked")
    private List<Class<? extends Enum<?>>> scanEnumClasses() throws ClassNotFoundException {

        ClassPathScanningCandidateComponentProvider provider =
                new ClassPathScanningCandidateComponentProvider(false);

        provider.addIncludeFilter(new AssignableTypeFilter(Enum.class));

        List<Class<? extends Enum<?>>> enumClasses = new ArrayList<>();

        for (BeanDefinition beanDefinition :
                provider.findCandidateComponents(ENUM_PACKAGE)) {

            Class<?> clazz = Class.forName(beanDefinition.getBeanClassName());

            if (clazz.isEnum()) {
                enumClasses.add((Class<? extends Enum<?>>) clazz);
            }
        }

        return enumClasses;
    }

    private List<String> getEnumValues(Class<? extends Enum<?>> enumClass) {
        return Arrays.stream(enumClass.getEnumConstants())
                .map(Enum::name)
                .toList();
    }
}

