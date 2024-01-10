package com.inventorysystem.Backend.mapper;

import com.inventorysystem.Backend.dto.sale.SaleArticleDTO;
import com.inventorysystem.Backend.dto.sale.SaleDTO;
import com.inventorysystem.Backend.dto.sale.SaleDetailDTO;
import com.inventorysystem.Backend.model.*;
import com.inventorysystem.Backend.repository.ArticleRepository;
import com.inventorysystem.Backend.repository.CustomerRepository;
import com.inventorysystem.Backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class SaleMapper {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    CustomerMapper customerMapper;

    @Autowired
    UserMapper userMapper;

    @Autowired
    ArticleMapper articleMapper;

    public SaleDTO saleToDTO(Sale sale) {
        SaleDTO convertedSale = modelMapper.map(sale, SaleDTO.class);

        Customer foundCustomer = customerRepository.getCustomerById(sale.getCustomerId());
        User foundUser = userRepository.getUserById(sale.getUserId());

        convertedSale.setCustomer(customerMapper.customerToDTO(foundCustomer));
        convertedSale.setUser(userMapper.userToDTO(foundUser));

        return convertedSale;
    }

    public SaleArticleDTO saleArticleToDTO(SaleDetail saleDetail) {
        SaleArticleDTO convertedSaleDetail = modelMapper.map(saleDetail, SaleArticleDTO.class);

        Article foundArticle = articleRepository.getArticleById(saleDetail.getArticleId());
        convertedSaleDetail.setArticle(articleMapper.articleToDTO(foundArticle));

        return convertedSaleDetail;
    }

    public SaleDetailDTO saleDetailToDTO(Sale sale, List<SaleDetail> saleArticles) {
        // General information about the sale
        SaleDetailDTO convertedSaleDetail = modelMapper.map(sale, SaleDetailDTO.class);

        Customer foundCustomer = customerRepository.getCustomerById(sale.getCustomerId());
        User foundUser = userRepository.getUserById(sale.getUserId());
        convertedSaleDetail.setCustomer(customerMapper.customerToDTO(foundCustomer));
        convertedSaleDetail.setUser(userMapper.userToDTO(foundUser));

        // Specific information about the sale (details)
        List<SaleArticleDTO> saleArticleDetails = saleArticles.stream()
                .map(saleArticle -> saleArticleToDTO(saleArticle))
                .collect(Collectors.toList());
        convertedSaleDetail.setSaleArticles(saleArticleDetails);

        return convertedSaleDetail;
    }
}
